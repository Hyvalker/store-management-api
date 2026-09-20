package com.hyvalker.storemanagementapi.service;


import com.hyvalker.storemanagementapi.dto.CreateProductRequest;
import com.hyvalker.storemanagementapi.dto.ProductResponseDTO;
import com.hyvalker.storemanagementapi.exception.InvalidProductException;
import com.hyvalker.storemanagementapi.exception.ProductNotFoundException;
import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.model.StockMovementType;
import com.hyvalker.storemanagementapi.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    public List<ProductResponseDTO> findAll(){
        return productRepository.findByActiveTrue()
                .stream()
                .map(ProductResponseDTO::new)
                .toList();
    }

    private void applyPricing(Product product, CreateProductRequest request) {

        BigDecimal costPrice = request.getCostPrice();
        BigDecimal salePrice = request.getSalePrice();
        BigDecimal profitMargin = request.getProfitMargin();

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

            BigDecimal salePriceCalculated = costPrice
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

        BigDecimal profitMarginCalculated = salePrice
                .subtract(costPrice)
                .divide(
                        costPrice,
                        4,
                        RoundingMode.HALF_UP
                )
                .multiply(BigDecimal.valueOf(100))
                .setScale(2, RoundingMode.HALF_UP);

        product.setSalePrice(salePrice);
        product.setProfitMargin(profitMarginCalculated);
    }

    @Transactional
    public ProductResponseDTO create(CreateProductRequest request) {
        Product product = new Product();

        product.setName(request.getName());
        product.setType(request.getType());
        product.setQuantity(request.getQuantity());
        applyPricing(product, request);
        product.setBarcode(request.getBarcode());
        product.setCreatedAt(LocalDateTime.now());


        Product savedProduct = productRepository.save(product);

        stockMovementService.createMovement(
                savedProduct,
                request.getQuantity(),
                StockMovementType.ENTRY
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
                    product.setName(request.getName());
                    product.setType(request.getType());
                    product.setBarcode(request.getBarcode());

                    applyPricing(product, request);

                    Product savedProduct = productRepository.save(product);
                    return new ProductResponseDTO(savedProduct);
                });
    }

    public void deactivateProduct (Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Produto não encontrado."));

        product.setActive(false);

        productRepository.save(product);
    }
}
