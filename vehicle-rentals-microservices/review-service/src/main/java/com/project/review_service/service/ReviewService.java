package com.project.review_service.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.review_service.entity.Review;
import com.project.review_service.repository.ReviewRepository;

@Service
public class ReviewService {
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	public List<Review> getAllReviews(){
		return reviewRepository.findAll();
	}
	
	public Review getReviewById(long id) {
		Optional<Review> reviewFound=reviewRepository.findById(id);
		if(reviewFound.isPresent()) {
			return reviewFound.get();
		}
		return null;
	}
	
	public Review postNewReview(Review review) {
		return reviewRepository.save(review);
	}
	
	public List<Review> getAllReviewsPostedByUser(long userId){
		return reviewRepository.findByUserId(userId);
	}
	
	public List<Review> getAllReviewsByVehicleId(long vehicleId){
		return reviewRepository.findByVehicleId(vehicleId);
	}
	
	public boolean deleteReviewById(long reviewId) {
		reviewRepository.deleteById(reviewId);
		return true;
	}

}
