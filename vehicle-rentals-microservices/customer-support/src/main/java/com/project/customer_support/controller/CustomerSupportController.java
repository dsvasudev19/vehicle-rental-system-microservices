package com.project.customer_support.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.customer_support.models.CustomerSupport;
import com.project.customer_support.service.CustomerSupportService;

@RestController
@RequestMapping("/support")
public class CustomerSupportController {
	@Autowired
	private CustomerSupportService supportService;
	
	@GetMapping("/greet")
	public String greet() {
		return "Hello! From Customer Support Service..............";
	}

	@GetMapping("/enquiries")
	public ResponseEntity<List<CustomerSupport>> getAllEnquiries() {
		return new ResponseEntity<>(supportService.getAll(), HttpStatus.OK);
	}

	@GetMapping("/enquiry/{id}")
	public ResponseEntity<CustomerSupport> getEnquiryById(@PathVariable long id) {
		CustomerSupport enquiry = supportService.getById(id);
		if (enquiry != null) {
			return new ResponseEntity<>(enquiry, HttpStatus.OK);
		}
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/enquiry")
	public ResponseEntity<?> postNewEnquiry(@RequestBody CustomerSupport supportPojo) {
		CustomerSupport enquiry = supportService.postNewEnquiry(supportPojo);
		return new ResponseEntity<>(enquiry, HttpStatus.OK);
	}

	@GetMapping("/enquiries/customer-name/{name}")
	public ResponseEntity<?> getEnquiriesOfCustomer(@PathVariable String name) {
		List<CustomerSupport> enquiries = supportService.getAllEnquiriesOfCustomer(name);
		return new ResponseEntity<>(enquiries, HttpStatus.OK);
	}
	
	@GetMapping("/enquiries/subject/{subjectLike}")
	public ResponseEntity<?> getEnquiriesContainingSubjectLike(@PathVariable String subjectLike){
		List<CustomerSupport> enquiries=supportService.getAllEnquiriesByKeywords(subjectLike);
		return new ResponseEntity<>(enquiries,HttpStatus.OK);
	}

	@DeleteMapping("/enquiry/{id}")
	public ResponseEntity<?> closeEnquiry(@PathVariable long id) {
		boolean solved = supportService.closeEnquiry(id);
		return new ResponseEntity<>(solved, HttpStatus.OK);
	}
}
