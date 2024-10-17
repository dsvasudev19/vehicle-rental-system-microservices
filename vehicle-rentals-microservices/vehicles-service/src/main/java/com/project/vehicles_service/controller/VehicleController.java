package com.project.vehicles_service.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.aspectj.weaver.NewConstructorTypeMunger;
import org.hibernate.query.NativeQuery.ReturnableResultNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.vehicles_service.ipc.BookingClient;
import com.project.vehicles_service.ipc.ReviewClient;
import com.project.vehicles_service.models.BookingPojo;
import com.project.vehicles_service.models.ReviewPojo;
import com.project.vehicles_service.models.VehiclePojo;
import com.project.vehicles_service.service.VehicleService;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {
	@Autowired
	private VehicleService vehicleService;

	@Autowired
	private BookingClient bookingClient;
	
	@Autowired
	private ReviewClient reviewClient;
	
	@GetMapping("/greet")
	public String greet() {
		return "Hello! From Vehicle Service..............";
	}

	@GetMapping
	public ResponseEntity<?> getAllVehicles() {
		return new ResponseEntity<>(vehicleService.getAllVehicles(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getVehicleById(@PathVariable long id) {
		VehiclePojo vehicle = vehicleService.getVehicleById(id);
		
		if (vehicle != null) {
			List<ReviewPojo> reviewsOfVehicle= reviewClient.getReviewsOfVehicle(id);
			vehicle.setReviews(reviewsOfVehicle);
			return new ResponseEntity<>(vehicle, HttpStatus.OK);
		}
		return ResponseEntity.noContent().build();
	}

	@PostMapping
	public ResponseEntity<?> addNewVehicle(@RequestBody VehiclePojo newVehiclePojo) {
		VehiclePojo vehicle = vehicleService.addNewVehicle(newVehiclePojo);
		return new ResponseEntity<>(vehicle, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateVehicle(@PathVariable long id, @RequestBody VehiclePojo updatedPojo) {
		VehiclePojo updatedVehicle = vehicleService.updateVehicle(id, updatedPojo);
		return new ResponseEntity<>(updatedVehicle, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteVehicleById(@PathVariable long id) {
		return new ResponseEntity<>(vehicleService.deleteVehicleById(id), HttpStatus.OK);
	}

	@GetMapping("/location/{location}")
	public ResponseEntity<?> getAllVehiclesByLocation(@PathVariable String location) {
		return new ResponseEntity<>(vehicleService.getAllVehiclesByLocation(location), HttpStatus.OK);
	}

	@GetMapping("/pincode/{pincode}")
	public ResponseEntity<?> getAllVehiclesByPincode(@PathVariable String pincode) {
		return new ResponseEntity<>(vehicleService.getAllVehiclesByPincode(pincode), HttpStatus.OK);
	}

	@GetMapping("/vendor/{vendorId}")
	public ResponseEntity<?> getAllVehiclesByVendorId(@PathVariable("vendorId") long id) {
		return new ResponseEntity<>(vehicleService.getVehiclesOfVendor(id), HttpStatus.OK);
	}

}
