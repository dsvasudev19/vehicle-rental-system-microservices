package com.project.review_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.review_service.entity.Review;
import com.project.review_service.service.ReviewService;

@RestController
@RequestMapping("/review")
public class ReviewController {
	@Autowired
	private ReviewService reviewService;
	
	@GetMapping("/greet")
	public String greet() {
		return "Hello! From Review Service..............";
	}
	
	@GetMapping
	public ResponseEntity<?> getAllReviews(){
		return new ResponseEntity<>(reviewService.getAllReviews(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getReviewById(@PathVariable long id){
		return new ResponseEntity<>(reviewService.getReviewById(id),HttpStatus.OK);
	}
	
	@GetMapping("/vehicle/{vehicleId}")
	public ResponseEntity<?> getReviewsOfVehicle(@PathVariable long vehicleId){
		return new ResponseEntity<>(reviewService.getAllReviewsByVehicleId(vehicleId),HttpStatus.OK);
	}
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getReviewsPostedByUser(@PathVariable long userId){
		return new ResponseEntity<>(reviewService.getAllReviewsPostedByUser(userId),HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<?> postNewReview(@RequestBody Review review){
		return new ResponseEntity<>(reviewService.postNewReview(review),HttpStatusCode.valueOf(200));
	}
	
	@DeleteMapping("/{reviewId}")
	public ResponseEntity<?> deleteReviewById(@PathVariable long reviewId){
		return new ResponseEntity<>(reviewService.deleteReviewById(reviewId),HttpStatus.OK);
	}
}
