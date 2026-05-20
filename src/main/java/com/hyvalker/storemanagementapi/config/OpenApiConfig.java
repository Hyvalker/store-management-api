package com.hyvalker.storemanagementapi.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class OpenApiConfig {
    @Bean

public OpenAPI storeManagementOpenAp() {

    return new OpenAPI()
            .info(new Info()
                    .title("Store Management API")
                    .description("API REST para gerenciamento de produtos, usuários, pedidos e controle de estoque.")
                    .version("1.0.0"));
    }
}
