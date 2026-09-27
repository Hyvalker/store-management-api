package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.CreateStockEntryRequest;
import com.hyvalker.storemanagementapi.dto.CreateProductRequest;
import com.hyvalker.storemanagementapi.dto.ProductResponseDTO;
import com.hyvalker.storemanagementapi.dto.CreateStockLossRequest;
import com.hyvalker.storemanagementapi.exception.InvalidProductException;
import com.hyvalker.storemanagementapi.exception.ProductNotFoundException;
import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.model.StockMovementType;
import com.hyvalker.storemanagementapi.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Locale;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;


@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final StockMovementService stockMovementService;

    public ProductService(
            ProductRepository productRepository,
            StockMovementService stockMovementService
    ) {
        this.productRepository = productRepository;
        this.stockMovementService = stockMovementService;
    }

    public List<ProductResponseDTO> findAll() {
        return productRepository.findByActiveTrue()
                .stream()
                .map(ProductResponseDTO::new)
                .toList();
    }

    public List<ProductResponseDTO> searchByName(String name) {
        return productRepository
                .findByNameContainingIgnoreCaseAndActiveTrue(name)
                .stream()
                .map(ProductResponseDTO::new)
                .toList();
    }

    public Optional<ProductResponseDTO> findByBarcorde(String barcode) {
        return productRepository.findByBarcode(barcode)
                .filter(product -> Boolean.TRUE.equals(product.getActive()))
                .map(ProductResponseDTO::new);
    }

    private void validateProductName(String name) {
        if (name == null || name.isBlank()) {
            throw new InvalidProductException(
                    "O nome do produto não poder estar em branco."
            );
        }

        if (name.matches(".*\\s{2,}.*")) {
            throw new InvalidProductException(
                    "O nome do produto não pode conter espaços consecutivos."
            );
        }

        if (name.matches(".*\\s-.*|-\\s.*")) {
            throw new InvalidProductException(
                    "O nome do produto não pode conter espaços ao redor de hífens"
            );
        }

        if (name.matches(".*\\(\\s.*|.*\\s\\).*")) {
            throw new InvalidProductException(
                    "O nome do produto não pode conter espaços imediatamente dentro de parênteses"
            );
        }
    }

    private BigDecimal calculateSalePrice(
            BigDecimal costPrice,
            BigDecimal profitMargin
    ) {
        return costPrice
                .multiply(
                        BigDecimal.ONE.add(
                                profitMargin.divide(
                                        BigDecimal.valueOf(100),
                                        4,
                                        RoundingMode.HALF_UP
                                )
                        )
                )
                .setScale(2, RoundingMode.HALF_UP);
    }

    private BigDecimal calculateProfitMargin(
            BigDecimal costPrice,
            BigDecimal salePrice
    ) {
        return salePrice
                .subtract(costPrice)
                .divide(
                        costPrice,
                        4,
                        RoundingMode.HALF_UP
                )
                .multiply(BigDecimal.valueOf(100))
                .setScale(2, RoundingMode.HALF_UP);
    }

    private void applyPricing(Product product, CreateProductRequest request) {
        applyPricing(
                product,
                request.getCostPrice(),
                request.getSalePrice(),
                request.getProfitMargin()
        );
    }

    private void applyPricing(
            Product product,
            BigDecimal costPrice,
            BigDecimal salePrice,
            BigDecimal profitMargin
    ) {

        // Custo zero: só o preço de venda pode ser informado.
        if (costPrice.compareTo(BigDecimal.ZERO) == 0) {

            if (salePrice == null) {
                throw new InvalidProductException(
                        "Para produtos com preço de custo zero, o preço de venda deve ser informado."
                );
            }

            if (profitMargin != null) {
                throw new InvalidProductException(
                        "Produtos com preço de custo zero não podem possuir margem de lucro."
                );
            }

            product.setCostPrice(costPrice);
            product.setSalePrice(salePrice);
            product.setProfitMargin(null);

            return;
        }

        // Custo maior que zero: os dois não podem ser informados ao mesmo tempo.
        if (salePrice != null && profitMargin != null) {
            throw new InvalidProductException(
                    "Informe apenas o preço de venda ou a margem de lucro."
            );
        }

        // É obrigatório informar pelo menos um dos dois.
        if (salePrice == null && profitMargin == null) {
            throw new InvalidProductException(
                    "Informe o preço de venda ou a margem de lucro."
            );
        }

        product.setCostPrice(costPrice);

        // Margem informada → calcula preço de venda.
        if (profitMargin != null) {

            BigDecimal salePriceCalculated = calculateSalePrice(
                    costPrice,
                    profitMargin
            );

            product.setProfitMargin(profitMargin);
            product.setSalePrice(salePriceCalculated);

            return;
        }

        // Preço de venda informado → calcula margem.
        if (salePrice.compareTo(BigDecimal.ZERO) == 0) {
            // Produto gratuito.
            product.setSalePrice(BigDecimal.ZERO);
            product.setProfitMargin(null);

            return;
        }

        // Não permite venda abaixo do custo.
        if (salePrice.compareTo(costPrice) < 0) {
            throw new InvalidProductException(
                    "O preço de venda não pode ser menor que o preço de custo."
            );
        }

        BigDecimal profitMarginCalculated = calculateProfitMargin(
                costPrice,
                salePrice
        );

        product.setSalePrice(salePrice);
        product.setProfitMargin(profitMarginCalculated);
    }

    @Transactional
    public ProductResponseDTO create(CreateProductRequest request) {
        String productName = prepareProductName(request.getName());
        String normalizedName = normalizeProductName(productName);

        Product product = new Product();

        product.setName(productName);
        product.setNormalizedName(normalizedName);
        product.setType(request.getType());
        product.setQuantity(request.getQuantity());
        product.setBarcode(request.getBarcode());

        applyPricing(product, request);

        Product savedProduct = productRepository.save(product);

        stockMovementService.createEntry(
                savedProduct,
                request.getQuantity(),
                savedProduct.getCostPrice(),
                savedProduct.getSalePrice(),
                savedProduct.getProfitMargin()
        );

        return new ProductResponseDTO(savedProduct);
    }

    @Transactional
    public ProductResponseDTO createStockEntry(CreateStockEntryRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ProductNotFoundException(
                        "Produto não encontrado."
                ));
        if (!Boolean.TRUE.equals(product.getActive())) {
            throw new InvalidProductException (
                    "Não é possível realizar uma entrada para um produto inativo."
            );
        }

        applyPricing(
                product,
                request.getCostPrice(),
                request.getSalePrice(),
                request.getProfitMargin()
        );

        product.setQuantity(product.getQuantity() + request.getQuantity());

        Product savedProduct = productRepository.save(product);

        stockMovementService.createEntry(
                savedProduct,
                request.getQuantity(),
                savedProduct.getCostPrice(),
                savedProduct.getSalePrice(),
                savedProduct.getProfitMargin()
        );

        return new ProductResponseDTO(savedProduct);
    }

    public Optional<ProductResponseDTO> findById(Long id) {
        return productRepository.findById(id)
                .map(ProductResponseDTO::new);
    }

    public Optional<ProductResponseDTO> update(Long id, CreateProductRequest request) {
        return productRepository.findById(id)
                .map(product -> {

                    String productName = prepareProductNameForUpdate(
                            request.getName(),
                            id
                    );

                    product.setName(productName);
                    product.setNormalizedName(normalizeProductName(productName));
                    product.setType(request.getType());
                    product.setBarcode(request.getBarcode());

                    applyPricing(product, request);

                    Product savedProduct = productRepository.save(product);

                    return new ProductResponseDTO(savedProduct);
                });
    }

    public void deactivateProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Produto não encontrado."));

        product.setActive(false);

        productRepository.save(product);
    }

    //Normaliza o nome do produto
    private String normalizeProductName(String name) {
        return name
                .replaceAll("\\s+", " ")
                .toLowerCase(Locale.ROOT);
    }

    private String prepareProductName(String name) {
        validateProductName(name);

        String trimmedName = name.trim();
        String normalizedNamed = normalizeProductName(trimmedName);

        if (productRepository.existsByNormalizedName(normalizedNamed)) {
            throw new InvalidProductException(
                    "Já existe um produto cadastrado com esse nome."
            );
        }

        return trimmedName;
    }

    private String prepareProductNameForUpdate(String name, Long productId) {
        validateProductName(name);

        String trimmedName = name.trim();
        String normalizedName = normalizeProductName(trimmedName);

        if (productRepository.existsByNormalizedNameAndIdNot(normalizedName, productId)) {
            throw new InvalidProductException(
                    "Já existe outro produto cadastrado com esse nome."
            );
        }

        return trimmedName;
    }

    @Transactional
    public ProductResponseDTO createStockLoss(CreateStockLossRequest request) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ProductNotFoundException(
                        "Produto não encontrado."
                ));

        if (!Boolean.TRUE.equals(product.getActive())) {
            throw new InvalidProductException(
                    "Não é possível registrar uma perda para um produto inativo."
            );
        }

        if (product.getQuantity() < request.getQuantity()) {
            throw new InvalidProductException(
                    "A quantidade de perda não pode ser maior que o estoque disponível."
            );
        }

        if (product.getQuantity() < request.getQuantity()) {
            throw new InvalidProductException(
                    "A quantidade da perda não pode ser maior que o estoque disponível."
            );
        }

        product.setQuantity(
                product.getQuantity() - request.getQuantity()
        );

        Product savedProduct = productRepository.save(product);

        stockMovementService.createLoss(
                savedProduct,
                request.getQuantity(),
                request.getReason()
        );

        return new ProductResponseDTO(savedProduct);
    }
}
