package com.hyvalker.storemanagementapi.exception;

public class OrderNotFoundException extends RuntimeException{

    public OrderNotFoundException (String message) {
        super (message);
    }
}
