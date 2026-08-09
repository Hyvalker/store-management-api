package com.hyvalker.storemanagementapi.service;


import com.hyvalker.storemanagementapi.dto.CreateProductRequest;
import com.hyvalker.storemanagementapi.dto.ProductResponseDTO;
import com.hyvalker.storemanagementapi.exception.ProductNotFoundException;
import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        product.setType(request.getType());
        product.setQuantity(request.getQuantity());
        product.setCostPrice(request.getCostPrice());
        product.setSalePrice(request.getSalePrice());
        product.setProfitMargin(request.getProfitMargin());
        product.setBarcode(request.getBarcode());
        product.setCreatedAt(LocalDateTime.now());


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
                    product.setType(request.getType());
                    product.setCostPrice(request.getCostPrice());
                    product.setSalePrice(request.getSalePrice());
                    product.setBarcode(request.getBarcode());

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
