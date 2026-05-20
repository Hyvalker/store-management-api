package com.hyvalker.storemanagementapi.service;


import com.hyvalker.storemanagementapi.dto.CreateProductRequest;
import com.hyvalker.storemanagementapi.dto.ProductResponseDTO;
import com.hyvalker.storemanagementapi.exception.ProductNotFoundException;
import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponseDTO> findAll(){
        return productRepository.findByActiveTrue()
                .stream()
                .map(ProductResponseDTO::new)
                .toList();
    }

    public ProductResponseDTO create(CreateProductRequest request) {
        Product product = new Product();

        product.setName(request.getName());
        product.setQuantity(request.getQuantity());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setCategory(request.getCategory());

        Product savedProduct = productRepository.save(product);

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
                    product.setPrice(request.getPrice());
                    product.setCategory(request.getCategory());
                    product.setDescription(request.getDescription());
                    product.setQuantity(request.getQuantity());

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
