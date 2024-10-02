package com.project.vendor_service.controllers;

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

import com.project.vendor_service.models.VendorPojo;
import com.project.vendor_service.service.VendorService;

@RestController
@RequestMapping("/vendor")
public class VendorController {
	@Autowired
	private VendorService vendorService;
	
	@GetMapping
	public ResponseEntity<?> getAllVendors(){
		return new ResponseEntity<>(vendorService.getAllVendors(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getVendorById(@PathVariable long id){
		VendorPojo vendorFound=vendorService.getVendorById(id);
		if(vendorFound!=null) {
			return new ResponseEntity<>(vendorFound,HttpStatus.OK);
		}
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<?> getVendorByEmail(@PathVariable String email){
		VendorPojo vendorFound=vendorService.getVendorByEmail(email);
		if(vendorFound!=null) {
			return new ResponseEntity<>(vendorFound,HttpStatus.OK);
		}
		return ResponseEntity.noContent().build();
		
	}
	
	@GetMapping("/name/{name}")
	public ResponseEntity<?> getVendorByName(@PathVariable String name){
		VendorPojo vendorFound=vendorService.getVendorByName(name);
		if(vendorFound!=null) {
			return new ResponseEntity<>(vendorFound,HttpStatus.OK);
		}
		return ResponseEntity.noContent().build();
	}

	@PostMapping
	public ResponseEntity<?> addNewVendor(@RequestBody VendorPojo vendorPojo){
		return new ResponseEntity<>(vendorService.addVendor(vendorPojo),HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateVendorById(@PathVariable long id,@RequestBody VendorPojo updatedVendorPojo){
		VendorPojo updatedVendor=vendorService.updateVendorById(id, updatedVendorPojo);
		return new ResponseEntity<>(updatedVendor,HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteVendorById(@PathVariable long id){
		boolean deleted=vendorService.deleteVendorById(id);
		return new ResponseEntity<>(deleted,HttpStatus.OK);
	}
}
