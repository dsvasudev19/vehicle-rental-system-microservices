package com.project.vehicles_service.ipc;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.vehicles_service.models.BookingPojo;

@FeignClient(value="bookings-service",url="http://localhost:9000/bookings")
public interface BookingClient {
	
	@GetMapping("/vehicle/{id}")
	public List<BookingPojo> getBookingByVehicleId(@PathVariable ("id")long vehicleId);
	
}
