package com.project.bookings_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.bookings_service.model.VehiclePojo;

@FeignClient(value = "vehicles-service",url = "http://localhost:9000/vehicle")
public interface VehicleClient {
	@GetMapping("/{id}")
	public VehiclePojo getVehicleById(@PathVariable long id);
}
