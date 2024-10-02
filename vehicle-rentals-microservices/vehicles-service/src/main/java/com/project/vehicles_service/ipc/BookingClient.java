package com.project.vehicles_service.ipc;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

import com.project.vehicles_service.models.BookingPojo;

import reactor.core.publisher.Flux;


@HttpExchange(url = "http://localhost:9000/api/bookings",accept = "application/json",contentType = "application/json")
public interface BookingClient {
	
	@GetExchange("/vehicle/{vehicleId}")
	Flux<BookingPojo> getAllBookingsOfVehicle(@PathVariable long vehicleId);
}
