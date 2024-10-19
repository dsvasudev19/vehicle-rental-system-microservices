package com.project.bookings_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.bookings_service.model.TransactionPojo;


@FeignClient(value = "payment-service",url = "http://localhost:9000/payment")
public interface PaymentClient {

	@PostMapping("/create-order")
	public TransactionPojo createNewTransaction(@RequestBody TransactionPojo transaction) throws Exception;
}
