package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.CreateProductRequest;
import com.hyvalker.storemanagementapi.dto.ProductResponseDTO;
import com.hyvalker.storemanagementapi.model.Category;
import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void shouldCreateProductSuccessfully() {
        //arrange
        CreateProductRequest request = new CreateProductRequest();
        request.setName("Ração Alcon Colors");
        request.setQuantity(9);
        request.setPrice(new BigDecimal("13.90"));
        request.setDescription("Ração com astaxantina da Alcon para peixes de água doce e marinhos");
        request.setCategory(Category.FOOD);

        Product savedProduct = new Product();

        savedProduct.setId(1L);
        savedProduct.setName("Ração Alcon Colors");
        savedProduct.setQuantity(9);
        savedProduct.setPrice(new BigDecimal("13.90"));
        savedProduct.setDescription("Ração com astaxantina da Alcon para peixes de água doce e marinhos");
        savedProduct.setCategory(Category.FOOD);
        savedProduct.setActive(true);

        when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

        //act
        ProductResponseDTO response = productService.create(request);

        //assert
        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals(9, response.getQuantity());
        assertEquals(new BigDecimal("13.90"), response.getPrice());
        assertEquals("Ração com astaxantina da Alcon para peixes de água doce e marinhos",
                response.getDescription());
        assertEquals(Category.FOOD, response.getCategory());
        assertTrue(response.getActive());

        verify(productRepository).save(any(Product.class));


    }

    @Test
    void shouldFindAllActiveProducts() {
        //arrange
        Product product1 = new Product();
        product1.setId(1L);
        product1.setName("Ração Alcon Colors");
        product1.setQuantity(9);
        product1.setPrice(new BigDecimal("13.90"));
        product1.setDescription("Ração com Astaxantina");
        product1.setCategory(Category.FOOD);
        product1.setActive(true);

        Product product2 = new Product();
        product2.setId(2L);
        product2.setName("Filtro interno SunSun");
        product2.setQuantity(5);
        product2.setPrice(new BigDecimal("129.90"));
        product2.setDescription("Filtro interno para aquário");
        product2.setCategory(Category.EQUIPMENT);
        product2.setActive(true);

        when(productRepository.findByActiveTrue()).thenReturn(List.of(product1, product2));

        //act
        List<ProductResponseDTO> response = productService.findAll();

        //assert
        assertNotNull(response);
        assertEquals(2, response.size());

        assertEquals(1L, response.get(0).getId());
        assertEquals("Ração Alcon Colors", response.get(0).getName());
        assertEquals(9, response.get(0).getQuantity());
        assertEquals(new BigDecimal("13.90"), response.get(0).getPrice());
        assertEquals("Ração com Astaxantina", response.get(0).getDescription());
        assertEquals(Category.FOOD, response.get(0).getCategory());
        assertEquals(true, response.get(0).getActive());

        assertEquals(2L, response.get(1).getId());
        assertEquals("Filtro interno SunSun", response.get(1).getName());
        assertEquals(5, response.get(1).getQuantity());
        assertEquals(new BigDecimal("129.90"), response.get(1).getPrice());
        assertEquals("Filtro interno para aquário", response.get(1).getDescription());
        assertEquals(Category.EQUIPMENT, response.get(1).getCategory());
        assertEquals(true, response.get(1).getActive());

        verify(productRepository).findByActiveTrue();
    }

    @Test
    void shouldFindProductByIdSuccessfully() {
        //arrange
        Product product = new Product();
        product.setId(1L);
        product.setName("Ração Alcon Colors");
        product.setQuantity(9);
        product.setPrice(new BigDecimal("13.90"));
        product.setDescription("Ração com Astaxantina");
        product.setCategory(Category.FOOD);
        product.setActive(true);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        //act
        Optional<ProductResponseDTO> response = productService.findById(1L);


        //assert
        assertTrue(response.isPresent());
        assertEquals(1L, response.get().getId());
        verify(productRepository).findById(1L);
    }

    @Test
    void shouldReturnEmptyWhenProductDoesNotExist() {
        //arrange
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        //act
        Optional<ProductResponseDTO> response = productService.findById(99L);

        //assert
        assertTrue(response.isEmpty());
        verify(productRepository).findById(99L);

    }

    @Test
    void shouldUpdateProductSuccessfully() {
        //arrange
        //Product in Database
        Product product = new Product();
        product.setId(1L);
        product.setName("Ração Alcon Colors");
        product.setQuantity(9);
        product.setPrice(new BigDecimal("13.90"));
        product.setDescription("Ração com Astaxantina");
        product.setCategory(Category.FOOD);
        product.setActive(true);


        //Request to change product with new values
        CreateProductRequest request = new CreateProductRequest();
        request.setName("Ração Poytara Carnívoros");
        request.setQuantity(3);
        request.setPrice(new BigDecimal("26.90"));
        request.setDescription("Ração para peixes carnívoros");
        request.setCategory(Category.FOOD);


        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        //act
        Optional<ProductResponseDTO> response = productService.update(1L, request);

        //assert
        assertTrue(response.isPresent());

        assertEquals(1L, response.get().getId());
        assertEquals("Ração Poytara Carnívoros", response.get().getName());
        assertEquals(3, response.get().getQuantity());
        assertEquals(new BigDecimal("26.90"), response.get().getPrice());
        assertEquals("Ração para peixes carnívoros", response.get().getDescription());
        assertEquals(Category.FOOD, response.get().getCategory());
        assertTrue(response.get().getActive());

        verify(productRepository).findById(1L);
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void shouldDeactivateProductSuccessfully() {
        //arrange

        //act

        //assert
    }

    @Test
    void shouldThrowProductNotFoundWhenDeactivatingNonExistentProduct() {
        //arrange

        //act

        //assert
    }


}
