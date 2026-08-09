package com.hyvalker.storemanagementapi.controller;


import com.hyvalker.storemanagementapi.dto.CreateProductRequest;
import com.hyvalker.storemanagementapi.dto.ProductResponseDTO;
import com.hyvalker.storemanagementapi.exception.ApiError;
import com.hyvalker.storemanagementapi.exception.ProductNotFoundException;
import com.hyvalker.storemanagementapi.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Products", description = "Endpoints para gerenciamento de produtos.")
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
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

    @Operation(summary = "Lista todos os produtos cadastrados.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produtos listados com sucesso.")
    })
    @GetMapping
    public List<ProductResponseDTO> findAll() {
        return productService.findAll();
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
        ProductResponseDTO response =  productService.findById(id)
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
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody CreateProductRequest request) {
        ProductResponseDTO response =  productService.update(id, request)
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
}

