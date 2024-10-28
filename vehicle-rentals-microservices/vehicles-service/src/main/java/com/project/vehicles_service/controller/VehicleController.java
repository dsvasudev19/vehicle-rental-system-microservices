package com.project.vehicles_service.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.project.vehicles_service.ipc.BookingClient;
import com.project.vehicles_service.ipc.ReviewClient;
import com.project.vehicles_service.models.ReviewPojo;
import com.project.vehicles_service.models.VehiclePojo;
import com.project.vehicles_service.service.VehicleService;


import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;

import java.util.Map;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {

	private static final String UPLOAD_DIR = "uploads/";
	
	@Value("${CLOUDINARY_URL}")
	String cloudinaryUrl;

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
			List<ReviewPojo> reviewsOfVehicle = reviewClient.getReviewsOfVehicle(id);
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

	@PostMapping("/add-vehicle")
	public ResponseEntity<?> addNewVehicleWithImage(@RequestParam("file") MultipartFile file, @RequestParam String name,
			@RequestParam String regNo, @RequestParam int wheelCount, @RequestParam String type,
			@RequestParam String location, @RequestParam String pincode, @RequestParam String description,
			@RequestParam double pricePerHr) {
		VehiclePojo vehiclePojo = new VehiclePojo();
		vehiclePojo.setName(name);
		vehiclePojo.setRegNo(regNo);
		vehiclePojo.setWheelCount(wheelCount);
		vehiclePojo.setType(type);
		vehiclePojo.setLocation(location);
		vehiclePojo.setPincode(pincode);
		vehiclePojo.setDescription(description);
		vehiclePojo.setPricePerHr(pricePerHr);

		String currentDir = System.getProperty("user.dir");
		
		
		Cloudinary cloudinary = new Cloudinary(cloudinaryUrl);
		System.out.println(cloudinary.config.cloudName);
		
		if (file != null && !file.isEmpty()) {
			try {
				Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
				System.out.println(uploadResult.get("secure_url"));
//				System.out.println("uploaded");
//				File uploadDirectory = new File(UPLOAD_DIR);
//				if (!uploadDirectory.exists()) {
//					uploadDirectory.mkdirs();
//				}
//				String fileName = UPLOAD_DIR + System.currentTimeMillis() + "-" + file.getOriginalFilename();
//
//				String filePath = Paths.get(currentDir, fileName).toString();
//				file.transferTo(new File(filePath));
				vehiclePojo.setImagePath((String) uploadResult.get("secure_url"));

			} catch (IOException e) {
				e.printStackTrace();
				return ResponseEntity.badRequest().body("File upload failed: " + e.getMessage());
			}
		} else {
			return ResponseEntity.badRequest().body("No file uploaded");
		}

		VehiclePojo newVehiclePojo = vehicleService.addNewVehicle(vehiclePojo);
		return new ResponseEntity<>(newVehiclePojo, HttpStatus.OK);
	}

}
