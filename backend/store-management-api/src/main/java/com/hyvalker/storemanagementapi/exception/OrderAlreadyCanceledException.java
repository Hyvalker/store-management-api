package com.hyvalker.storemanagementapi.exception;

public class OrderAlreadyCanceledException extends RuntimeException{

    public OrderAlreadyCanceledException (String message) {
        super (message);
    }
}
