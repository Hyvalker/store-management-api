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

        when(productRepository.existsByNormalizedName("betta splendens")).thenReturn(true);

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

        when(productRepository.existsByNormalizedName("filtro canister")).thenReturn(false);
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

        when(productRepository.existsByNormalizedName("ração promoção")).thenReturn(false);

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

        when(productRepository.existsByNormalizedName("coral hammer toxic green")).thenReturn(false);
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

        when(productRepository.existsByNormalizedName("animal raro customizado")).thenReturn(false);
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
}
