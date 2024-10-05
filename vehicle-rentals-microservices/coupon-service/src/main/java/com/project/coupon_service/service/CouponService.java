package com.project.coupon_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.coupon_service.repository.CouponRepository;

@Service
public class CouponService {
	
	@Autowired
	private CouponRepository couponRepository;

}
