package com.project.review_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.review_service.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
	
}
