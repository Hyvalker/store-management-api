package com.hyvalker.storemanagementapi.controller;


import com.hyvalker.storemanagementapi.dto.CreateOrderRequest;
import com.hyvalker.storemanagementapi.dto.OrderResponseDTO;
import com.hyvalker.storemanagementapi.exception.ApiError;
import com.hyvalker.storemanagementapi.exception.OrderNotFoundException;
import com.hyvalker.storemanagementapi.model.OrderStatus;
import com.hyvalker.storemanagementapi.service.OrderService;
import com.hyvalker.storemanagementapi.model.PaymentMethod;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@Tag(name = "Orders", description = "Endpoints para gerenciamento de pedidos.")
@RequiredArgsConstructor
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    @Operation(summary = "Cria um novo pedido.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Pedido criado com sucesso."),
            @ApiResponse(responseCode = "400", description = "Dados inválidos na requisição.",
                    content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiError.class)
            )),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado.",
                    content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiError.class)
            )),
            @ApiResponse(responseCode = "409", description = "Produto inativo, preço inválido ou estoque insuficiente.",
                    content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiError.class)
            ))
    })
    @PostMapping
    public ResponseEntity<OrderResponseDTO> createOrder(@Valid @RequestBody CreateOrderRequest request) {

        OrderResponseDTO response = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Lista todos os pedidos. Pode ser filtrado por cliente informando o parâmetro customerId e/ou por período (from e to).")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pedidos listados com sucesso.")
    })
    @GetMapping
    public List<OrderResponseDTO> findAll(
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to
    ) {
        return orderService.findAll(customerId, from, to);
    }

    @Operation(summary = "Lista todos os pedidos de um cliente específico. Pode ser filtrado por período (from e to).")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pedidos do cliente listados com sucesso.")
    })
    @GetMapping("/customer/{customerId}")
    public List<OrderResponseDTO> findByCustomerId(
            @PathVariable Long customerId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to
    ) {
        return orderService.findAll(customerId, from, to);
    }

    @Operation(summary = "Encontra um pedido pelo ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pedido encontrado com sucesso."),
            @ApiResponse(responseCode = "404", description = "Pedido não encontrado.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    ))
    })
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> findById(@PathVariable Long id) {
        OrderResponseDTO response = orderService.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Pedido não encontrado."));

        return ResponseEntity.ok(response);
    }
    @Operation(summary = "Cancela um pedido pelo ID. Estornar um pedido já PAGO exige papel ADMIN.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pedido cancelado com sucesso."),
            @ApiResponse(responseCode = "403", description = "Somente administradores podem estornar pedidos pagos.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    )),
            @ApiResponse(responseCode = "404", description = "Pedido não encontrado.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    )),
            @ApiResponse(responseCode = "409", description = "Pedido já estava cancelado.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    ))
    })
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<OrderResponseDTO> cancelOrder(@PathVariable Long id, Authentication authentication) {

        // Autorização "fina": a regra depende do ESTADO do pedido, não só da URL.
        // Pedido pendente -> qualquer operador cancela. Pedido pago (estorno) -> só ADMIN.
        OrderResponseDTO current = orderService.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Pedido não encontrado."));

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(authority -> "ROLE_ADMIN".equals(authority.getAuthority()));

        if (current.getStatus() == OrderStatus.PAID && !isAdmin) {
            throw new AccessDeniedException("Somente administradores podem estornar pedidos já pagos.");
        }

        OrderResponseDTO response = orderService.cancelOrder(id);

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Confirma o pagamento de um pedido.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pagamento confirmado com sucesso."),
            @ApiResponse(responseCode = "404", description = "Pedido não encontrado.",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiError.class)
            )),
            @ApiResponse(responseCode = "409", description = "Pedido inválido ou estoque insuficiente",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiError.class)
            ))
    })
    @PatchMapping("/{id}/pay")
    public ResponseEntity<OrderResponseDTO> payOrder(
            @PathVariable Long id,
            @RequestParam(required = false) PaymentMethod paymentMethod) {

        OrderResponseDTO response = orderService.payOrder(id, paymentMethod);

        return ResponseEntity.ok(response);
    }
}
