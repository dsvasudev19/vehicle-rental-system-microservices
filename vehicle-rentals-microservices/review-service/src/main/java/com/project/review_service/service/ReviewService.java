package com.project.review_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.review_service.entity.Review;
import com.project.review_service.models.ReviewPojo;
import com.project.review_service.repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<ReviewPojo> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        List<ReviewPojo> reviewsList = new ArrayList<>();
        reviews.forEach(review -> {
            ReviewPojo pojo = new ReviewPojo();
            BeanUtils.copyProperties(review, pojo);
            reviewsList.add(pojo);
        });
        return reviewsList;
    }

    public ReviewPojo getReviewById(long id) {
        Optional<Review> reviewFound = reviewRepository.findById(id);
        if (reviewFound.isPresent()) {
            ReviewPojo pojo = new ReviewPojo();
            BeanUtils.copyProperties(reviewFound.get(), pojo);
            return pojo;
        }
        return null;
    }

    public ReviewPojo postNewReview(Review review) {
        Review savedReview = reviewRepository.save(review);
        ReviewPojo pojo = new ReviewPojo();
        BeanUtils.copyProperties(savedReview, pojo);
        return pojo;
    }

    public List<ReviewPojo> getAllReviewsPostedByUser(long userId) {
        List<Review> reviews = reviewRepository.findByUserId(userId);
        List<ReviewPojo> reviewsList = new ArrayList<>();
        reviews.forEach(review -> {
            ReviewPojo pojo = new ReviewPojo();
            BeanUtils.copyProperties(review, pojo);
            reviewsList.add(pojo);
        });
        return reviewsList;
    }

    public List<ReviewPojo> getAllReviewsByVehicleId(long vehicleId) {
        List<Review> reviews = reviewRepository.findByVehicleId(vehicleId);
        List<ReviewPojo> reviewsList = new ArrayList<>();
        reviews.forEach(review -> {
            ReviewPojo pojo = new ReviewPojo();
            BeanUtils.copyProperties(review, pojo);
            reviewsList.add(pojo);
        });
        return reviewsList;
    }

    public boolean deleteReviewById(long reviewId) {
        reviewRepository.deleteById(reviewId);
        return true;
    }
}
