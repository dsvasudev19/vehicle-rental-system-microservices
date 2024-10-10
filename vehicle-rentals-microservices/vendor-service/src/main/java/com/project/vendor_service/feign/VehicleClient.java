package com.project.vendor_service.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.vendor_service.models.VehiclePojo;

@FeignClient(value = "vehicles-service",url = "http://api-gateway:9000/vehicle/")
public interface VehicleClient {
	
	@GetMapping("/vendor/{vendorId}")
	public  List<VehiclePojo> getAllVehiclesByVendorId(@PathVariable long vendorId);


}
