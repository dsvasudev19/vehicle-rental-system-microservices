package com.project.coupon_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.coupon_service.entity.Coupon;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long>{
	Optional<Coupon> findByCode(String code);
	
	
	
}
