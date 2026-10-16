package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.ProductResponseDTO;
import com.hyvalker.storemanagementapi.exception.InvalidProductException;
import com.hyvalker.storemanagementapi.exception.ProductNotFoundException;
import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.model.ProductImage;
import com.hyvalker.storemanagementapi.repository.ProductImageRepository;
import com.hyvalker.storemanagementapi.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class ProductImageService {

    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif"
    );

    private static final long MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

    public ProductImageService(
            ProductImageRepository productImageRepository,
            ProductRepository productRepository
    ) {
        this.productImageRepository = productImageRepository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public Optional<ProductImage> getImage(Long productId) {
        return productImageRepository.findById(productId);
    }

    public ProductResponseDTO saveImage(Long productId, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidProductException("Nenhum arquivo de imagem foi enviado.");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new InvalidProductException("O tamanho da imagem não pode ultrapassar 15MB.");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            throw new InvalidProductException("Formato de imagem inválido. Formatos permitidos: JPG, PNG, WEBP, GIF.");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Produto não encontrado com ID: " + productId));

        try {
            byte[] bytes = file.getBytes();
            ProductImage productImage = productImageRepository.findById(productId)
                    .orElseGet(() -> ProductImage.builder()
                            .productId(productId)
                            .build());

            productImage.setImageData(bytes);
            productImage.setContentType(contentType.toLowerCase());
            productImage.setFileName(file.getOriginalFilename());
            productImage.setFileSize(file.getSize());

            productImageRepository.save(productImage);

            // Set direct endpoint URL with version query to invalidate browser caches
            String endpointUrl = "/api/products/" + productId + "/image?v=" + System.currentTimeMillis();
            product.setImageSlug(endpointUrl);
            Product savedProduct = productRepository.save(product);

            return new ProductResponseDTO(savedProduct);
        } catch (IOException e) {
            throw new InvalidProductException("Falha ao processar o arquivo de imagem: " + e.getMessage());
        }
    }

    public ProductResponseDTO deleteImage(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Produto não encontrado com ID: " + productId));

        if (productImageRepository.existsById(productId)) {
            productImageRepository.deleteById(productId);
        }

        product.setImageSlug(null);
        Product savedProduct = productRepository.save(product);

        return new ProductResponseDTO(savedProduct);
    }
}
