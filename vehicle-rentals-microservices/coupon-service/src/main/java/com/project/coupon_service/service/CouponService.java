package com.project.coupon_service.service;

import java.util.List;
import java.util.Optional;
import org.hibernate.id.insert.InsertReturningDelegate;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.coupon_service.entity.Coupon;
import com.project.coupon_service.repository.CouponRepository;

@Service
public class CouponService {

	@Autowired
	private CouponRepository couponRepository;

	public List<Coupon> getAllCoupons() {
		return couponRepository.findAll();
	}

	public Coupon getCouponById(long id) {
		Optional<Coupon> couponFound = couponRepository.findById(id);
		if (couponFound.isPresent()) {
			return couponFound.get();
		}
		return null;
	}

	public Coupon createNewCoupon(Coupon coupon) {
		return couponRepository.save(coupon);
	}

	public Coupon updateCoupon(Long id, Coupon updatedCoupon) {
		Optional<Coupon> couponFound = couponRepository.findById(id);
		if (couponFound.isPresent()) {
			Coupon coupon = couponFound.get();
			BeanUtils.copyProperties(updatedCoupon, coupon);
			couponRepository.save(coupon);
			return coupon;
		}
		return null;
	}

	public boolean deleteCouponById(long id) {
		couponRepository.deleteById(id);
		return true;
	}

	public Coupon findCouponByCode(String code) {
		Optional<Coupon> couponFound = couponRepository.findByCode(code);
		if (couponFound.isPresent()) {
			return couponFound.get();
		}
		return null;
	}
}
