package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.CreateProductRequest;
import com.hyvalker.storemanagementapi.dto.CreateStockEntryRequest;
import com.hyvalker.storemanagementapi.dto.CreateStockLossRequest;
import com.hyvalker.storemanagementapi.dto.ProductResponseDTO;
import com.hyvalker.storemanagementapi.dto.UpdateProductRequest;
import com.hyvalker.storemanagementapi.exception.InvalidProductException;
import com.hyvalker.storemanagementapi.exception.ProductNotFoundException;
import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.model.Type;
import com.hyvalker.storemanagementapi.repository.ProductRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import com.hyvalker.storemanagementapi.model.SubCategory;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.access.AccessDeniedException;
import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private StockMovementService stockMovementService;

    @Spy
    private TaxonomyClassifierService taxonomyClassifierService = new TaxonomyClassifierService();

    @InjectMocks
    private ProductService productService;

    // ==========================================
    // VALIDATION AND CREATION TESTS
    // ==========================================

    @Test
    @DisplayName("Deve falhar ao criar produto com nome em branco")
    void shouldFailWhenNameIsBlank() {
        CreateProductRequest request = new CreateProductRequest();
        request.setName("   ");

        assertThatThrownBy(() -> productService.create(request))
                .isInstanceOf(InvalidProductException.class)
                .hasMessageContaining("não poder estar em branco");
    }

    @Test
    @DisplayName("Deve falhar ao criar produto com espaços consecutivos no nome")
    void shouldFailWhenNameHasConsecutiveSpaces() {
        CreateProductRequest request = new CreateProductRequest();
        request.setName("Ração   Peixe");

        assertThatThrownBy(() -> productService.create(request))
                .isInstanceOf(InvalidProductException.class)
                .hasMessageContaining("espaços consecutivos");
    }

    @Test
    @DisplayName("Deve falhar ao criar produto com nome já existente no catálogo")
    void shouldFailWhenProductNameAlreadyExists() {
        CreateProductRequest request = new CreateProductRequest();
        request.setName("Betta Splendens");
        request.setType(Type.LIVING);
        request.setQuantity(5);
        request.setCostPrice(BigDecimal.valueOf(5));
        request.setSalePrice(BigDecimal.valueOf(15));

        when(productRepository.existsByNormalizedNameAndActiveTrue("betta splendens")).thenReturn(true);

        assertThatThrownBy(() -> productService.create(request))
                .isInstanceOf(InvalidProductException.class)
                .hasMessageContaining("Já existe um produto cadastrado com esse nome");
    }

    @Test
    @DisplayName("Deve criar produto com margem de lucro calculando o preço de venda automaticamente")
    void shouldCreateProductWithProfitMarginCalculatingSalePrice() {
        CreateProductRequest request = new CreateProductRequest();
        request.setName("Filtro Canister");
        request.setType(Type.PRODUCT);
        request.setQuantity(2);
        request.setCostPrice(BigDecimal.valueOf(100));
        request.setProfitMargin(BigDecimal.valueOf(50)); // 50% de margem -> venda 150

        when(productRepository.existsByNormalizedNameAndActiveTrue("filtro canister")).thenReturn(false);
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> {
            Product p = invocation.getArgument(0);
            p.setId(1L);
            return p;
        });

        ProductResponseDTO response = productService.create(request);

        assertThat(response).isNotNull();
        assertThat(response.getCostPrice()).isEqualByComparingTo(BigDecimal.valueOf(100));
        assertThat(response.getSalePrice()).isEqualByComparingTo(BigDecimal.valueOf(150.00));
        assertThat(response.getProfitMargin()).isEqualByComparingTo(BigDecimal.valueOf(50));
        verify(stockMovementService).createEntry(any(), eq(2), eq(BigDecimal.valueOf(100)), eq(new BigDecimal("150.00")), eq(BigDecimal.valueOf(50)));
    }

    @Test
    @DisplayName("Deve falhar ao tentar cadastrar preço de venda menor do que o custo")
    void shouldFailWhenSalePriceIsLowerThanCostPrice() {
        CreateProductRequest request = new CreateProductRequest();
        request.setName("Ração Promoção");
        request.setType(Type.PRODUCT);
        request.setQuantity(10);
        request.setCostPrice(BigDecimal.valueOf(50));
        request.setSalePrice(BigDecimal.valueOf(30)); // Venda menor que custo

        when(productRepository.existsByNormalizedNameAndActiveTrue("ração promoção")).thenReturn(false);

        assertThatThrownBy(() -> productService.create(request))
                .isInstanceOf(InvalidProductException.class)
                .hasMessageContaining("não pode ser menor que o preço de custo");
    }

    // ==========================================
    // STOCK ENTRY TESTS
    // ==========================================

    @Test
    @DisplayName("Deve dar entrada de estoque e somar quantidade ao estoque existente")
    void shouldAddStockEntrySuccessfully() {
        Product existingProduct = new Product();
        existingProduct.setId(10L);
        existingProduct.setName("Termômetro");
        existingProduct.setQuantity(5);
        existingProduct.setActive(true);
        existingProduct.setCostPrice(BigDecimal.valueOf(10));
        existingProduct.setSalePrice(BigDecimal.valueOf(20));

        CreateStockEntryRequest request = new CreateStockEntryRequest();
        request.setProductId(10L);
        request.setQuantity(15);
        request.setCostPrice(BigDecimal.valueOf(12));
        request.setSalePrice(BigDecimal.valueOf(24));

        when(productRepository.findById(10L)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(existingProduct)).thenReturn(existingProduct);

        ProductResponseDTO response = productService.createStockEntry(request);

        assertThat(response.getQuantity()).isEqualTo(20); // 5 + 15
        verify(stockMovementService).createEntry(eq(existingProduct), eq(15), any(), any(), any());
    }

    @Test
    @DisplayName("Deve falhar entrada de estoque para produto inativo")
    void shouldFailStockEntryForInactiveProduct() {
        Product inactiveProduct = new Product();
        inactiveProduct.setId(10L);
        inactiveProduct.setActive(false);

        CreateStockEntryRequest request = new CreateStockEntryRequest();
        request.setProductId(10L);
        request.setQuantity(5);

        when(productRepository.findById(10L)).thenReturn(Optional.of(inactiveProduct));

        assertThatThrownBy(() -> productService.createStockEntry(request))
                .isInstanceOf(InvalidProductException.class)
                .hasMessageContaining("inativo");
    }

    // ==========================================
    // STOCK LOSS TESTS
    // ==========================================

    @Test
    @DisplayName("Deve registrar perda de estoque com sucesso")
    void shouldRegisterStockLossSuccessfully() {
        Product product = new Product();
        product.setId(20L);
        product.setName("Acará Disco");
        product.setQuantity(10);
        product.setActive(true);

        CreateStockLossRequest request = new CreateStockLossRequest();
        request.setProductId(20L);
        request.setQuantity(2);
        request.setReason("Doença");

        when(productRepository.findById(20L)).thenReturn(Optional.of(product));
        when(productRepository.save(product)).thenReturn(product);

        ProductResponseDTO response = productService.createStockLoss(request);

        assertThat(response.getQuantity()).isEqualTo(8); // 10 - 2
        verify(stockMovementService).createLoss(product, 2, "Doença");
    }

    @Test
    @DisplayName("Deve falhar ao registrar perda com quantidade maior que o estoque")
    void shouldFailStockLossWhenQuantityExceedsAvailable() {
        Product product = new Product();
        product.setId(20L);
        product.setName("Carpa");
        product.setQuantity(3);
        product.setActive(true);

        CreateStockLossRequest request = new CreateStockLossRequest();
        request.setProductId(20L);
        request.setQuantity(10); // maior que 3

        when(productRepository.findById(20L)).thenReturn(Optional.of(product));

        assertThatThrownBy(() -> productService.createStockLoss(request))
                .isInstanceOf(InvalidProductException.class)
                .hasMessageContaining("não pode ser maior que o estoque disponível");
    }

    // ==========================================
    // DEACTIVATE PRODUCT TESTS
    // ==========================================

    @Test
    @DisplayName("Deve desativar produto com sucesso")
    void shouldDeactivateProductSuccessfully() {
        Product product = new Product();
        product.setId(30L);
        product.setActive(true);

        when(productRepository.findById(30L)).thenReturn(Optional.of(product));

        productService.deactivateProduct(30L);

        assertThat(product.getActive()).isFalse();
        verify(productRepository).save(product);
    }

    // ==========================================
    // TAXONOMY AUTO-CLASSIFICATION TESTS
    // ==========================================

    @Test
    @DisplayName("Deve inferir automaticamente SubCategory e ImageSlug ao cadastrar sem informar")
    void shouldAutoClassifySubCategoryAndImageSlugWhenNotProvided() {
        CreateProductRequest request = new CreateProductRequest();
        request.setName("Coral Hammer Toxic Green");
        request.setType(Type.LIVING);
        request.setQuantity(4);
        request.setCostPrice(BigDecimal.valueOf(80));
        request.setSalePrice(BigDecimal.valueOf(150));

        when(productRepository.existsByNormalizedNameAndActiveTrue("coral hammer toxic green")).thenReturn(false);
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> {
            Product p = invocation.getArgument(0);
            p.setId(100L);
            return p;
        });

        ProductResponseDTO response = productService.create(request);

        assertThat(response).isNotNull();
        assertThat(response.getSubCategory()).isEqualTo(SubCategory.CORAL);
        assertThat(response.getImageSlug()).isEqualTo("coral-hammer.jpg");
    }

    @Test
    @DisplayName("Deve respeitar SubCategory informada manualmente pelo usuário")
    void shouldRespectManuallyProvidedSubCategory() {
        CreateProductRequest request = new CreateProductRequest();
        request.setName("Animal Raro Customizado");
        request.setType(Type.LIVING);
        request.setSubCategory(SubCategory.INVERTEBRATE);
        request.setImageSlug("custom-slug.jpg");
        request.setQuantity(2);
        request.setCostPrice(BigDecimal.valueOf(50));
        request.setSalePrice(BigDecimal.valueOf(100));

        when(productRepository.existsByNormalizedNameAndActiveTrue("animal raro customizado")).thenReturn(false);
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> {
            Product p = invocation.getArgument(0);
            p.setId(101L);
            return p;
        });

        ProductResponseDTO response = productService.create(request);

        assertThat(response).isNotNull();
        assertThat(response.getSubCategory()).isEqualTo(SubCategory.INVERTEBRATE);
        assertThat(response.getImageSlug()).isEqualTo("custom-slug.jpg");
    }

    @Test
    @DisplayName("Deve filtrar produtos por subcategoria chamando o repositório correto")
    void shouldFilterProductsBySubCategory() {
        productService.findBySubCategory(SubCategory.CORAL);
        verify(productRepository).findBySubCategoryAndActiveTrue(SubCategory.CORAL);

        productService.findBySubCategory(null);
        verify(productRepository).findByActiveTrue();
    }

    @Test
    @DisplayName("Deve permitir que administrador altere o preço de venda na reposição de estoque")
    void shouldAllowAdminToChangeSalePriceInStockEntry() {
        Product existing = new Product();
        existing.setId(20L);
        existing.setName("Sal Marinho 20kg");
        existing.setActive(true);
        existing.setQuantity(2);
        existing.setCostPrice(BigDecimal.valueOf(100));
        existing.setSalePrice(BigDecimal.valueOf(180));

        CreateStockEntryRequest request = new CreateStockEntryRequest();
        request.setProductId(20L);
        request.setQuantity(5);
        request.setCostPrice(BigDecimal.valueOf(110));
        request.setSalePrice(BigDecimal.valueOf(200));

        when(productRepository.findByIdWithLock(20L)).thenReturn(Optional.of(existing));
        when(productRepository.save(existing)).thenReturn(existing);

        ProductResponseDTO response = productService.createStockEntry(request, true);

        assertThat(response.getSalePrice()).isEqualByComparingTo(BigDecimal.valueOf(200));
        assertThat(response.getCostPrice()).isEqualByComparingTo(BigDecimal.valueOf(110));
        assertThat(response.getQuantity()).isEqualTo(7);
    }

    @Test
    @DisplayName("Deve impedir que operador comum altere o preço de venda na reposição de estoque")
    void shouldFailWhenNonAdminAttemptsToChangeSalePriceInStockEntry() {
        Product existing = new Product();
        existing.setId(21L);
        existing.setName("Sal Marinho 20kg");
        existing.setActive(true);
        existing.setQuantity(2);
        existing.setCostPrice(BigDecimal.valueOf(100));
        existing.setSalePrice(BigDecimal.valueOf(180));

        CreateStockEntryRequest request = new CreateStockEntryRequest();
        request.setProductId(21L);
        request.setQuantity(5);
        request.setCostPrice(BigDecimal.valueOf(110));
        request.setSalePrice(BigDecimal.valueOf(200)); // Preço diferente do atual (180)

        when(productRepository.findByIdWithLock(21L)).thenReturn(Optional.of(existing));

        assertThatThrownBy(() -> productService.createStockEntry(request, false))
                .isInstanceOf(AccessDeniedException.class)
                .hasMessageContaining("Somente administradores podem alterar o preço de venda");
    }

    @Test
    @DisplayName("Deve permitir que operador comum faça reposição quando o preço de venda não é alterado")
    void shouldAllowNonAdminStockEntryWhenSalePriceIsUnchangedOrOmitted() {
        Product existing = new Product();
        existing.setId(22L);
        existing.setName("Carvão Ativado");
        existing.setActive(true);
        existing.setQuantity(4);
        existing.setCostPrice(BigDecimal.valueOf(20));
        existing.setSalePrice(BigDecimal.valueOf(40));

        CreateStockEntryRequest request = new CreateStockEntryRequest();
        request.setProductId(22L);
        request.setQuantity(6);
        request.setCostPrice(BigDecimal.valueOf(22));
        // salePrice e profitMargin omitidos

        when(productRepository.findByIdWithLock(22L)).thenReturn(Optional.of(existing));
        when(productRepository.save(existing)).thenReturn(existing);

        ProductResponseDTO response = productService.createStockEntry(request, false);

        assertThat(response.getSalePrice()).isEqualByComparingTo(BigDecimal.valueOf(40));
        assertThat(response.getCostPrice()).isEqualByComparingTo(BigDecimal.valueOf(22));
        assertThat(response.getQuantity()).isEqualTo(10);
    }

    @Test
    @DisplayName("Deve reativar produto desativado com sucesso")
    void shouldReactivateDeactivatedProductSuccessfully() {
        Product inactiveProduct = new Product();
        inactiveProduct.setId(30L);
        inactiveProduct.setName("Termostato 100W");
        inactiveProduct.setNormalizedName("termostato 100w");
        inactiveProduct.setActive(false);
        inactiveProduct.setCostPrice(BigDecimal.valueOf(30));
        inactiveProduct.setSalePrice(BigDecimal.valueOf(60));

        when(productRepository.findById(30L)).thenReturn(Optional.of(inactiveProduct));
        when(productRepository.existsByNormalizedNameAndActiveTrue("termostato 100w")).thenReturn(false);
        when(productRepository.save(inactiveProduct)).thenReturn(inactiveProduct);

        ProductResponseDTO response = productService.reactivateProduct(30L);

        assertThat(response.getActive()).isTrue();
        assertThat(inactiveProduct.getActive()).isTrue();
        verify(productRepository).save(inactiveProduct);
    }

    @Test
    @DisplayName("Deve falhar ao tentar reativar produto que já está ativo")
    void shouldFailToReactivateAlreadyActiveProduct() {
        Product activeProduct = new Product();
        activeProduct.setId(31L);
        activeProduct.setName("Termostato 200W");
        activeProduct.setActive(true);

        when(productRepository.findById(31L)).thenReturn(Optional.of(activeProduct));

        assertThatThrownBy(() -> productService.reactivateProduct(31L))
                .isInstanceOf(InvalidProductException.class)
                .hasMessageContaining("já está ativo");
    }

    @Test
    @DisplayName("Deve falhar ao reativar se já existir outro produto ativo com o mesmo nome")
    void shouldFailToReactivateIfAnotherActiveProductHasSameName() {
        Product inactiveProduct = new Product();
        inactiveProduct.setId(32L);
        inactiveProduct.setName("Bomba Submersa");
        inactiveProduct.setNormalizedName("bomba submersa");
        inactiveProduct.setActive(false);

        when(productRepository.findById(32L)).thenReturn(Optional.of(inactiveProduct));
        when(productRepository.existsByNormalizedNameAndActiveTrue("bomba submersa")).thenReturn(true);

        assertThatThrownBy(() -> productService.reactivateProduct(32L))
                .isInstanceOf(InvalidProductException.class)
                .hasMessageContaining("Já existe outro produto ativo");
    }

    // ==========================================
    // BARCODE LOOKUP AND UNIQUENESS TESTS
    // ==========================================

    @Test
    @DisplayName("Deve buscar produto ativo por código de barras com sucesso")
    void shouldFindProductByBarcodeSuccessfully() {
        Product product = new Product();
        product.setId(40L);
        product.setName("Sal Marinho 1kg");
        product.setBarcode("7891234567890");
        product.setActive(true);

        when(productRepository.findFirstByBarcodeAndActiveTrue("7891234567890"))
                .thenReturn(Optional.of(product));

        Optional<ProductResponseDTO> result = productService.findByBarcode("7891234567890");

        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("Sal Marinho 1kg");
        assertThat(result.get().getBarcode()).isEqualTo("7891234567890");
    }

    @Test
    @DisplayName("Deve retornar vazio ao buscar por código de barras em branco ou inexistente")
    void shouldReturnEmptyWhenBarcodeNotFoundOrBlank() {
        assertThat(productService.findByBarcode("  ")).isEmpty();
        assertThat(productService.findByBarcode(null)).isEmpty();

        when(productRepository.findFirstByBarcodeAndActiveTrue("999999"))
                .thenReturn(Optional.empty());

        assertThat(productService.findByBarcode("999999")).isEmpty();
    }

    @Test
    @DisplayName("Deve falhar ao criar produto com código de barras já existente em produto ativo")
    void shouldFailToCreateProductWhenActiveBarcodeAlreadyExists() {
        CreateProductRequest request = new CreateProductRequest();
        request.setName("Ração Palhaço 50g");
        request.setType(Type.PRODUCT);
        request.setQuantity(10);
        request.setCostPrice(BigDecimal.valueOf(15.00));
        request.setSalePrice(BigDecimal.valueOf(30.00));
        request.setBarcode("7899999999999");

        when(productRepository.existsByNormalizedNameAndActiveTrue("ração palhaço 50g")).thenReturn(false);
        when(productRepository.existsByBarcodeAndActiveTrue("7899999999999")).thenReturn(true);

        assertThatThrownBy(() -> productService.create(request))
                .isInstanceOf(InvalidProductException.class)
                .hasMessageContaining("Já existe um produto ativo cadastrado com esse código de barras.");

        verify(productRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve falhar ao atualizar produto com código de barras já utilizado por outro produto ativo")
    void shouldFailToUpdateProductWhenActiveBarcodeAlreadyExistsOnAnotherProduct() {
        Product existingProduct = new Product();
        existingProduct.setId(50L);
        existingProduct.setName("Termostato 50W");
        existingProduct.setActive(true);

        UpdateProductRequest request = new UpdateProductRequest();
        request.setName("Termostato 50W");
        request.setType(Type.PRODUCT);
        request.setCostPrice(BigDecimal.valueOf(50.00));
        request.setSalePrice(BigDecimal.valueOf(100.00));
        request.setBarcode("7898888888888");

        when(productRepository.findById(50L)).thenReturn(Optional.of(existingProduct));
        when(productRepository.existsByNormalizedNameAndIdNotAndActiveTrue("termostato 50w", 50L)).thenReturn(false);
        when(productRepository.existsByBarcodeAndIdNotAndActiveTrue("7898888888888", 50L)).thenReturn(true);

        assertThatThrownBy(() -> productService.update(50L, request))
                .isInstanceOf(InvalidProductException.class)
                .hasMessageContaining("Já existe outro produto ativo cadastrado com esse código de barras.");

        verify(productRepository, never()).save(any());
    }
}
