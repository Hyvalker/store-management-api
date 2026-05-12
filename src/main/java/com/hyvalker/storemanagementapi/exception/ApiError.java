package com.hyvalker.storemanagementapi.exception;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApiError {

    private LocalDateTime timestamp;
    private Integer status;
    private String error;

    public ApiError(Integer status, String error) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
    }
}
