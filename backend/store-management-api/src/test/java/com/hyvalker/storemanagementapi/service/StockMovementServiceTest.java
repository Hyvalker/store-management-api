package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.model.StockMovement;
import com.hyvalker.storemanagementapi.model.StockMovementType;
import com.hyvalker.storemanagementapi.repository.StockMovementRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StockMovementServiceTest {

    @Mock
    private StockMovementRepository stockMovementRepository;

    @InjectMocks
    private StockMovementService stockMovementService;

    @Test
    @DisplayName("Deve criar movimentação de entrada (ENTRY) com preços e margem")
    void shouldCreateEntryMovementSuccessfully() {
        Product product = new Product();
        product.setId(1L);
        product.setName("Ração Tropical");

        when(stockMovementRepository.save(any(StockMovement.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        StockMovement result = stockMovementService.createEntry(
                product,
                15,
                BigDecimal.valueOf(10),
                BigDecimal.valueOf(20),
                BigDecimal.valueOf(100)
        );

        assertThat(result.getType()).isEqualTo(StockMovementType.ENTRY);
        assertThat(result.getProduct()).isEqualTo(product);
        assertThat(result.getQuantity()).isEqualTo(15);
        assertThat(result.getCostPrice()).isEqualByComparingTo(BigDecimal.valueOf(10));
        assertThat(result.getSalePrice()).isEqualByComparingTo(BigDecimal.valueOf(20));
        assertThat(result.getProfitMargin()).isEqualByComparingTo(BigDecimal.valueOf(100));
        assertThat(result.getCreatedAt()).isNotNull();

        verify(stockMovementRepository).save(any(StockMovement.class));
    }

    @Test
    @DisplayName("Deve criar movimentação simples (ex: SALE ou RETURN)")
    void shouldCreateSimpleMovementSuccessfully() {
        Product product = new Product();
        product.setId(2L);
        product.setName("Bomba Submersa");

        when(stockMovementRepository.save(any(StockMovement.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        StockMovement result = stockMovementService.createMovement(
                product,
                3,
                StockMovementType.SALE
        );

        assertThat(result.getType()).isEqualTo(StockMovementType.SALE);
        assertThat(result.getProduct()).isEqualTo(product);
        assertThat(result.getQuantity()).isEqualTo(3);
        assertThat(result.getCreatedAt()).isNotNull();

        verify(stockMovementRepository).save(any(StockMovement.class));
    }

    @Test
    @DisplayName("Deve criar movimentação de perda (LOSS) com motivo")
    void shouldCreateLossMovementWithReason() {
        Product product = new Product();
        product.setId(3L);
        product.setName("Guppy Red Dragon");

        ArgumentCaptor<StockMovement> captor = ArgumentCaptor.forClass(StockMovement.class);
        when(stockMovementRepository.save(captor.capture()))
                .thenAnswer(invocation -> invocation.getArgument(0));

        StockMovement result = stockMovementService.createLoss(
                product,
                2,
                "Mortalidade natural durante a quarentena"
        );

        assertThat(result.getType()).isEqualTo(StockMovementType.LOSS);
        assertThat(result.getProduct()).isEqualTo(product);
        assertThat(result.getQuantity()).isEqualTo(2);
        assertThat(result.getReason()).isEqualTo("Mortalidade natural durante a quarentena");
        assertThat(captor.getValue().getReason()).isEqualTo("Mortalidade natural durante a quarentena");
    }
}
