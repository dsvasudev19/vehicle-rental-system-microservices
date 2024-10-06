package com.project.user_service.ipc;

import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

import com.project.user_service.model.BookingPojo;

import reactor.core.publisher.Flux;

@HttpExchange(url = "http://api-gateway:9000/api/bookings",accept = "application/json",contentType = "application/json")
public interface BookingClient {
	
	@GetExchange("/users/{id}")
	Flux<BookingPojo> getAllBookingsOfUser(long id);
	
}
