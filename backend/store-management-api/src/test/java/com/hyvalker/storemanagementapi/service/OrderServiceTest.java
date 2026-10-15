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
import java.time.LocalDateTime;
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

    @Test
    @DisplayName("Deve falhar ao criar pedido para cliente inativo")
    void shouldFailWhenCustomerIsInactive() {
        User inactiveCustomer = new User();
        inactiveCustomer.setId(99L);
        inactiveCustomer.setName("Cliente Inativo");
        inactiveCustomer.setActive(false);

        CreateOrderItemRequest item = new CreateOrderItemRequest();
        item.setProductId(1L);
        item.setQuantity(1);

        CreateOrderRequest request = new CreateOrderRequest();
        request.setCustomerId(99L);
        request.setItems(List.of(item));

        when(userRepository.findById(99L)).thenReturn(Optional.of(inactiveCustomer));

        assertThatThrownBy(() -> orderService.createOrder(request))
                .isInstanceOf(InvalidOrderException.class)
                .hasMessageContaining("Não é possível criar pedido para um cliente inativo");

        verify(orderRepository, never()).save(any());
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

    @Test
    @DisplayName("Deve criar pedido com desconto e método de pagamento calculados corretamente")
    void shouldCreateOrderWithDiscountAndPaymentMethod() {
        Product product = createValidProduct(1L, "Filtro Canister", 10, BigDecimal.valueOf(50), BigDecimal.valueOf(100));

        CreateOrderItemRequest item = new CreateOrderItemRequest();
        item.setProductId(1L);
        item.setQuantity(2);

        CreateOrderRequest request = new CreateOrderRequest();
        request.setCustomerName("Carlos Cliente");
        request.setItems(List.of(item));
        request.setDiscountPercentage(BigDecimal.valueOf(10)); // 10%
        request.setPaymentMethod(PaymentMethod.PIX);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
            Order o = invocation.getArgument(0);
            o.setId(100L);
            return o;
        });

        OrderResponseDTO response = orderService.createOrder(request);

        assertThat(response.getId()).isEqualTo(100L);
        assertThat(response.getSubtotalPrice()).isEqualByComparingTo("200.00");
        assertThat(response.getDiscountPercentage()).isEqualByComparingTo("10.00");
        assertThat(response.getDiscountAmount()).isEqualByComparingTo("20.00");
        assertThat(response.getTotalPrice()).isEqualByComparingTo("180.00");
        assertThat(response.getPaymentMethod()).isEqualTo(PaymentMethod.PIX);
    }

    @Test
    @DisplayName("Deve falhar ao criar pedido com percentual de desconto negativo ou acima de 100")
    void shouldFailWhenDiscountPercentageIsInvalid() {
        Product product = createValidProduct(1L, "Termostato", 10, BigDecimal.valueOf(20), BigDecimal.valueOf(40));

        CreateOrderItemRequest item = new CreateOrderItemRequest();
        item.setProductId(1L);
        item.setQuantity(1);

        CreateOrderRequest request = new CreateOrderRequest();
        request.setItems(List.of(item));
        request.setDiscountPercentage(BigDecimal.valueOf(110)); // > 100%

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        assertThatThrownBy(() -> orderService.createOrder(request))
                .isInstanceOf(InvalidOrderException.class)
                .hasMessageContaining("entre 0 e 100");
    }

    @Test
    @DisplayName("Deve pagar pedido e atualizar forma de pagamento")
    void shouldPayOrderWithPaymentMethod() {
        Product product = createValidProduct(1L, "Ração Peixes", 10, BigDecimal.valueOf(15), BigDecimal.valueOf(30));

        Order order = new Order();
        order.setId(10L);
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentMethod(PaymentMethod.MONEY);

        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setProduct(product);
        orderItem.setQuantity(2);
        order.getItems().add(orderItem);

        when(orderRepository.findById(10L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        OrderResponseDTO response = orderService.payOrder(10L, PaymentMethod.DEBIT);

        assertThat(response.getStatus()).isEqualTo(OrderStatus.PAID);
        assertThat(response.getPaymentMethod()).isEqualTo(PaymentMethod.DEBIT);
        assertThat(product.getQuantity()).isEqualTo(8);
        verify(stockMovementService).createMovement(eq(product), eq(2), eq(StockMovementType.SALE));
    }

    @Test
    @DisplayName("Deve buscar produto com lock pessimista ao pagar pedido garantindo integridade concorrente")
    void shouldLockProductWhenPayingOrder() {
        Product product = createValidProduct(5L, "Skimmer", 3, BigDecimal.valueOf(200), BigDecimal.valueOf(400));
        product.setVersion(1L);

        Order order = new Order();
        order.setId(50L);
        order.setStatus(OrderStatus.PENDING);

        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setProduct(product);
        item.setQuantity(1);
        order.getItems().add(item);

        when(orderRepository.findById(50L)).thenReturn(Optional.of(order));
        when(productRepository.findByIdWithLock(5L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(inv -> inv.getArgument(0));

        OrderResponseDTO response = orderService.payOrder(50L);

        assertThat(response.getStatus()).isEqualTo(OrderStatus.PAID);
        assertThat(product.getQuantity()).isEqualTo(2);
        verify(productRepository).findByIdWithLock(5L);
        verify(stockMovementService).createMovement(eq(product), eq(1), eq(StockMovementType.SALE));
    }

    @Test
    @DisplayName("Deve buscar pedidos filtrados por cliente ordenados por data decrescente")
    void shouldFindOrdersByCustomerId() {
        User customer = new User();
        customer.setId(15L);
        customer.setName("Aquarista VIP");

        Order order1 = new Order();
        order1.setId(101L);
        order1.setCustomer(customer);
        order1.setStatus(OrderStatus.PAID);
        order1.setTotalPrice(BigDecimal.valueOf(150.00));

        Order order2 = new Order();
        order2.setId(102L);
        order2.setCustomer(customer);
        order2.setStatus(OrderStatus.PENDING);
        order2.setTotalPrice(BigDecimal.valueOf(80.00));

        when(orderRepository.findByCustomerIdOrderByCreatedAtDesc(15L)).thenReturn(List.of(order1, order2));

        List<OrderResponseDTO> result = orderService.findByCustomerId(15L);

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getId()).isEqualTo(101L);
        assertThat(result.get(0).getCustomerId()).isEqualTo(15L);
        assertThat(result.get(0).getCustomerName()).isEqualTo("Aquarista VIP");
        assertThat(result.get(1).getId()).isEqualTo(102L);
        verify(orderRepository).findByCustomerIdOrderByCreatedAtDesc(15L);
    }

    @Test
    @DisplayName("Deve buscar todos os pedidos sem filtros")
    void shouldFindAllOrdersWithoutFilters() {
        Order order = new Order();
        order.setId(201L);
        order.setStatus(OrderStatus.PAID);
        order.setTotalPrice(BigDecimal.valueOf(199.90));

        when(orderRepository.findAll()).thenReturn(List.of(order));

        List<OrderResponseDTO> result = orderService.findAll();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getId()).isEqualTo(201L);
        verify(orderRepository).findAll();
    }

    @Test
    @DisplayName("Deve buscar pedidos por intervalo de datas")
    void shouldFindOrdersByDateRange() {
        LocalDateTime from = LocalDateTime.now().minusDays(7);
        LocalDateTime to = LocalDateTime.now();

        Order order = new Order();
        order.setId(301L);
        order.setStatus(OrderStatus.PAID);
        order.setTotalPrice(BigDecimal.valueOf(350.00));

        when(orderRepository.findByCreatedAtBetweenOrderByCreatedAtDesc(from, to))
                .thenReturn(List.of(order));

        List<OrderResponseDTO> result = orderService.findAll(null, from, to);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getId()).isEqualTo(301L);
        verify(orderRepository).findByCreatedAtBetweenOrderByCreatedAtDesc(from, to);
    }

    @Test
    @DisplayName("Deve buscar pedidos por cliente e intervalo de datas")
    void shouldFindOrdersByCustomerIdAndDateRange() {
        Long customerId = 10L;
        LocalDateTime from = LocalDateTime.now().minusDays(30);
        LocalDateTime to = LocalDateTime.now();

        Order order = new Order();
        order.setId(401L);
        order.setStatus(OrderStatus.PAID);
        order.setTotalPrice(BigDecimal.valueOf(500.00));

        when(orderRepository.findByCustomerIdAndCreatedAtBetweenOrderByCreatedAtDesc(customerId, from, to))
                .thenReturn(List.of(order));

        List<OrderResponseDTO> result = orderService.findAll(customerId, from, to);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getId()).isEqualTo(401L);
        verify(orderRepository).findByCustomerIdAndCreatedAtBetweenOrderByCreatedAtDesc(customerId, from, to);
    }
}
