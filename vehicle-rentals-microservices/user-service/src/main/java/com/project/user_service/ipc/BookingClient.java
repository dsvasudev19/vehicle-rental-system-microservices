package com.project.user_service.ipc;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.user_service.model.BookingPojo;

@FeignClient(value = "bookings-service",url="http://localhost:9000/bookings")
public interface BookingClient {
	
	@GetMapping("/users/{id}")
	public List<BookingPojo> getBookingByUserId(@PathVariable("id") long userId);

	@PostMapping
	public BookingPojo addBooking(@RequestBody BookingPojo bookingPojo);
}
