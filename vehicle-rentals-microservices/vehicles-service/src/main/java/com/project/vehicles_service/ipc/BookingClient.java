package com.project.vehicles_service.ipc;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.vehicles_service.models.BookingPojo;

@FeignClient(value="bookings-service",url="http://localhost:9000/bookings")
public interface BookingClient {
	
	@GetMapping("/vehicle/{id}")
	public ResponseEntity<BookingPojo>getBookingByVehicleId(@PathVariable ("id")long vehicleId);
	
}
