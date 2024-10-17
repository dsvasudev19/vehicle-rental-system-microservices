package com.project.payment_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.payment_service.models.BookingPojo;

@FeignClient(value = "bookings-service",url = "http://localhost:9000/bookings")
public interface BookingClient {
	@GetMapping("/{id}")
	public BookingPojo getABooking(@PathVariable("id") long bookingId);
	
	@PatchMapping("/status/{id}")
	public BookingPojo updateStatusOfBooking(@PathVariable long id, @RequestParam String status);
}
