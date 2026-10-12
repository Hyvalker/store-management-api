package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.CreateOrderItemRequest;
import com.hyvalker.storemanagementapi.dto.CreateOrderRequest;
import com.hyvalker.storemanagementapi.dto.OrderResponseDTO;
import com.hyvalker.storemanagementapi.exception.InsufficientStockException;
import com.hyvalker.storemanagementapi.exception.InvalidOrderException;
import com.hyvalker.storemanagementapi.exception.OrderAlreadyCanceledException;
import com.hyvalker.storemanagementapi.exception.OrderNotFoundException;
import com.hyvalker.storemanagementapi.exception.ProductNotFoundException;
import com.hyvalker.storemanagementapi.model.*;
import com.hyvalker.storemanagementapi.repository.OrderRepository;
import com.hyvalker.storemanagementapi.repository.ProductRepository;
import com.hyvalker.storemanagementapi.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private StockMovementService stockMovementService;

    @InjectMocks
    private OrderService orderService;

    private Product createValidProduct(Long id, String name, int qty, BigDecimal cost, BigDecimal sale) {
        Product product = new Product();
        product.setId(id);
        product.setName(name);
        product.setQuantity(qty);
        product.setCostPrice(cost);
        product.setSalePrice(sale);
        product.setActive(true);
        return product;
    }

    // ==========================================
    // CREATE ORDER TESTS
    // ==========================================

    @Test
    @DisplayName("Deve falhar ao criar pedido sem itens")
    void shouldFailWhenItemsListIsEmpty() {
        CreateOrderRequest request = new CreateOrderRequest();
        request.setItems(Collections.emptyList());

        assertThatThrownBy(() -> orderService.createOrder(request))
                .isInstanceOf(InvalidOrderException.class)
                .hasMessageContaining("pelo menos um item");

        verifyNoInteractions(orderRepository);
    }

    @Test
    @DisplayName("Deve falhar ao criar pedido quando produto não existe")
    void shouldFailWhenProductDoesNotExist() {
        CreateOrderItemRequest item = new CreateOrderItemRequest();
        item.setProductId(999L);
        item.setQuantity(1);

        CreateOrderRequest request = new CreateOrderRequest();
        request.setItems(List.of(item));

        when(productRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> orderService.createOrder(request))
                .isInstanceOf(ProductNotFoundException.class);

        verify(orderRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve falhar ao criar pedido quando produto está inativo")
    void shouldFailWhenProductIsInactive() {
        Product inactiveProduct = createValidProduct(1L, "Ração", 10, BigDecimal.TEN, BigDecimal.valueOf(20));
        inactiveProduct.setActive(false);

        CreateOrderItemRequest item = new CreateOrderItemRequest();
        item.setProductId(1L);
        item.setQuantity(1);

        CreateOrderRequest request = new CreateOrderRequest();
        request.setItems(List.of(item));

        when(productRepository.findById(1L)).thenReturn(Optional.of(inactiveProduct));

        assertThatThrownBy(() -> orderService.createOrder(request))
                .isInstanceOf(InvalidOrderException.class)
                .hasMessageContaining("inativo");
    }

    @Test
    @DisplayName("Deve falhar ao criar pedido quando quantidade solicitada for maior que o estoque")
    void shouldFailWhenStockIsInsufficient() {
        Product product = createValidProduct(1L, "Betta", 3, BigDecimal.valueOf(5), BigDecimal.valueOf(15));

        CreateOrderItemRequest item = new CreateOrderItemRequest();
        item.setProductId(1L);
        item.setQuantity(5); // maior que 3

        CreateOrderRequest request = new CreateOrderRequest();
        request.setItems(List.of(item));

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        assertThatThrownBy(() -> orderService.createOrder(request))
                .isInstanceOf(InsufficientStockException.class)
                .hasMessageContaining("Estoque insuficiente");
    }

    @Test
    @DisplayName("Deve criar pedido com sucesso em status PENDING e calcular o valor total")
    void shouldCreateOrderSuccessfully() {
        Product product = createValidProduct(1L, "Tetra Neon", 20, BigDecimal.valueOf(2), BigDecimal.valueOf(5));

        CreateOrderItemRequest item = new CreateOrderItemRequest();
        item.setProductId(1L);
        item.setQuantity(4);

        CreateOrderRequest request = new CreateOrderRequest();
        request.setCustomerName("Marcelo Aquários");
        request.setItems(List.of(item));

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
            Order o = invocation.getArgument(0);
            o.setId(100L);
            return o;
        });

        OrderResponseDTO response = orderService.createOrder(request);

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(100L);
        assertThat(response.getStatus()).isEqualTo(OrderStatus.PENDING);
        assertThat(response.getTotalPrice()).isEqualByComparingTo(BigDecimal.valueOf(20)); // 4 * 5 = 20
        assertThat(response.getCustomerName()).isEqualTo("Marcelo Aquários");
        verify(orderRepository).save(any(Order.class));
    }

    // ==========================================
    // PAY ORDER TESTS
    // ==========================================

    @Test
    @DisplayName("Deve pagar pedido com sucesso, dar baixa no estoque e registrar movimento SALE")
    void shouldPayOrderSuccessfully() {
        Product product = createValidProduct(1L, "Filtro Hang-On", 10, BigDecimal.valueOf(50), BigDecimal.valueOf(100));

        Order order = new Order();
        order.setId(10L);
        order.setStatus(OrderStatus.PENDING);

        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setProduct(product);
        orderItem.setQuantity(2);
        orderItem.setUnitPrice(BigDecimal.valueOf(100));
        orderItem.setSubtotal(BigDecimal.valueOf(200));

        order.getItems().add(orderItem);

        when(orderRepository.findById(10L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        OrderResponseDTO response = orderService.payOrder(10L);

        assertThat(response.getStatus()).isEqualTo(OrderStatus.PAID);
        assertThat(product.getQuantity()).isEqualTo(8); // 10 - 2 = 8
        verify(stockMovementService).createMovement(eq(product), eq(2), eq(StockMovementType.SALE));
        verify(orderRepository).save(order);
    }

    @Test
    @DisplayName("Deve falhar ao tentar pagar pedido já pago")
    void shouldFailWhenPayingAlreadyPaidOrder() {
        Order order = new Order();
        order.setId(10L);
        order.setStatus(OrderStatus.PAID);

        when(orderRepository.findById(10L)).thenReturn(Optional.of(order));

        assertThatThrownBy(() -> orderService.payOrder(10L))
                .isInstanceOf(InvalidOrderException.class)
                .hasMessageContaining("já foi pago");
    }

    @Test
    @DisplayName("Deve falhar ao tentar pagar pedido cancelado")
    void shouldFailWhenPayingCanceledOrder() {
        Order order = new Order();
        order.setId(10L);
        order.setStatus(OrderStatus.CANCELED);

        when(orderRepository.findById(10L)).thenReturn(Optional.of(order));

        assertThatThrownBy(() -> orderService.payOrder(10L))
                .isInstanceOf(InvalidOrderException.class)
                .hasMessageContaining("cancelado");
    }

    // ==========================================
    // CANCEL ORDER TESTS
    // ==========================================

    @Test
    @DisplayName("Deve estornar estoque e registrar movimento RETURN ao cancelar pedido PAGO")
    void shouldRestoreStockWhenCancelingPaidOrder() {
        Product product = createValidProduct(1L, "Termostato", 5, BigDecimal.valueOf(30), BigDecimal.valueOf(60));

        Order order = new Order();
        order.setId(20L);
        order.setStatus(OrderStatus.PAID);

        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setProduct(product);
        item.setQuantity(3);
        order.getItems().add(item);

        when(orderRepository.findById(20L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        OrderResponseDTO response = orderService.cancelOrder(20L);

        assertThat(response.getStatus()).isEqualTo(OrderStatus.CANCELED);
        assertThat(product.getQuantity()).isEqualTo(8); // 5 + 3 = 8
        verify(stockMovementService).createMovement(eq(product), eq(3), eq(StockMovementType.RETURN));
        verify(orderRepository).save(order);
    }

    @Test
    @DisplayName("Deve cancelar pedido PENDING sem alterar estoque")
    void shouldCancelPendingOrderWithoutChangingStock() {
        Order order = new Order();
        order.setId(21L);
        order.setStatus(OrderStatus.PENDING);

        when(orderRepository.findById(21L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        OrderResponseDTO response = orderService.cancelOrder(21L);

        assertThat(response.getStatus()).isEqualTo(OrderStatus.CANCELED);
        verifyNoInteractions(stockMovementService);
        verify(orderRepository).save(order);
    }

    @Test
    @DisplayName("Deve falhar ao tentar cancelar pedido que já está cancelado")
    void shouldFailWhenCancelingAlreadyCanceledOrder() {
        Order order = new Order();
        order.setId(22L);
        order.setStatus(OrderStatus.CANCELED);

        when(orderRepository.findById(22L)).thenReturn(Optional.of(order));

        assertThatThrownBy(() -> orderService.cancelOrder(22L))
                .isInstanceOf(OrderAlreadyCanceledException.class)
                .hasMessageContaining("já foi cancelado");
    }
}
