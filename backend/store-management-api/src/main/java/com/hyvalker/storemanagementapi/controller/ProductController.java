package com.hyvalker.storemanagementapi.controller;

import com.hyvalker.storemanagementapi.dto.CreateProductRequest;
import com.hyvalker.storemanagementapi.dto.UpdateProductRequest;
import com.hyvalker.storemanagementapi.dto.CreateStockEntryRequest;
import com.hyvalker.storemanagementapi.dto.ProductResponseDTO;
import com.hyvalker.storemanagementapi.dto.CreateStockLossRequest;
import com.hyvalker.storemanagementapi.exception.ApiError;
import com.hyvalker.storemanagementapi.exception.ProductNotFoundException;
import com.hyvalker.storemanagementapi.model.SubCategory;
import com.hyvalker.storemanagementapi.service.ProductImageService;
import com.hyvalker.storemanagementapi.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Tag(name = "Products", description = "Endpoints para gerenciamento de produtos.")
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final ProductImageService productImageService;

    public ProductController(ProductService productService, ProductImageService productImageService) {
        this.productService = productService;
        this.productImageService = productImageService;
    }

    @Operation(summary = "Cadastra um novo produto.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Produto cadastrado com sucesso."),
            @ApiResponse(responseCode = "400", description = "Dados inválidos na requisição.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    ))
    })
    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody CreateProductRequest request) {
        ProductResponseDTO response = productService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/stock-loss")
    public ResponseEntity<ProductResponseDTO> createStockLoss(
            @Valid @RequestBody CreateStockLossRequest request
    ) {
        return ResponseEntity.ok(
                productService.createStockLoss(request)
        );
    }

    @Operation(summary = "Lista todos os produtos cadastrados.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produtos listados com sucesso.")
    })
    @GetMapping
    public List<ProductResponseDTO> findAll(@RequestParam(required = false) SubCategory subCategory) {
        if (subCategory != null) {
            return productService.findBySubCategory(subCategory);
        }
        return productService.findAll();
    }

    @Operation(summary = "Buscaproduto ativo pelo código de barras.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto encontrado com sucesso."),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    ))
    })
    @GetMapping("/barcode/{barcode}")
    public ResponseEntity<ProductResponseDTO> findByBarcode(
            @PathVariable String barcode
    ) {
        ProductResponseDTO response = productService.findByBarcode(barcode)
                .orElseThrow(() -> new ProductNotFoundException(
                        "Produto não encontrado."
                ));
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Busca produtos ativos pelo nome.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produtos encontrados com sucesso.")
    })
    @GetMapping("/search")
    public List<ProductResponseDTO> searchByName(
            @RequestParam String name
    ) {
        return productService.searchByName(name);
    }

    @Operation(summary = "Busca produto por ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto encontrado com sucesso."),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    ))
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> findById(@PathVariable Long id) {
        ProductResponseDTO response = productService.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Produto não encontrado"));

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Atualiza informações de um produto já cadastrado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto atualizado com sucesso."),
            @ApiResponse(responseCode = "400", description = "Dados inválidos na requisição.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    )),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    ))
    })
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody UpdateProductRequest request) {
        ProductResponseDTO response = productService.update(id, request)
                .orElseThrow(() -> new ProductNotFoundException("Produto não encontrado."));

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Desativa o produto da lista de produtos cadastrados.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Produto desativado com sucesso."),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    ))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deactivateProduct(@PathVariable Long id) {
        productService.deactivateProduct(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Reativa um produto desativado.")
    @PatchMapping("/{id}/reactivate")
    public ResponseEntity<ProductResponseDTO> reactivateProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.reactivateProduct(id));
    }

    @PostMapping("/stock-entry")
    public ResponseEntity<ProductResponseDTO> createStockEntry(
            @Valid @RequestBody CreateStockEntryRequest request,
            Authentication authentication
    ) {
        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
        return ResponseEntity.ok(productService.createStockEntry(request, isAdmin));
    }

    @Operation(summary = "Retorna a imagem oficial cadastrada para o produto.")
    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getProductImage(@PathVariable Long id) {
        return productImageService.getImage(id)
                .map(img -> ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(img.getContentType()))
                        .cacheControl(CacheControl.maxAge(7, TimeUnit.DAYS).cachePublic())
                        .body(img.getImageData()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Upload de foto oficial para curadoria visual do produto.")
    @PostMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponseDTO> uploadProductImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) {
        ProductResponseDTO response = productImageService.saveImage(id, file);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Remove a foto oficial personalizada do produto.")
    @DeleteMapping("/{id}/image")
    public ResponseEntity<ProductResponseDTO> deleteProductImage(@PathVariable Long id) {
        ProductResponseDTO response = productImageService.deleteImage(id);
        return ResponseEntity.ok(response);
    }
}
