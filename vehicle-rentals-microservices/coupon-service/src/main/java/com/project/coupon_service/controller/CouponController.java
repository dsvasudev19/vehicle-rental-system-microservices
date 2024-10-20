package com.project.coupon_service.controller;

import java.util.Map;

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

import com.project.coupon_service.entity.Coupon;
import com.project.coupon_service.service.CouponService;

@RestController
@RequestMapping("/coupon")
public class CouponController {

	@Autowired
	private CouponService couponService;

	@GetMapping("/greet")
	public String greet() {
		return "Helloo................from Coupon Service.!";
	}

	@GetMapping
	public ResponseEntity<?> getAllCoupons() {
		return new ResponseEntity<>(couponService.getAllCoupons(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getCouponById(@PathVariable long id) {
		return new ResponseEntity<>(couponService.getCouponById(id), HttpStatus.OK);
	}

	@GetMapping("/code/{code}")
	public ResponseEntity<?> getCouponByCode(@PathVariable String code) {
		return new ResponseEntity<>(couponService.findCouponByCode(code), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<?> createCoupon(@RequestBody Coupon newCoupon) {
		return new ResponseEntity<>(couponService.createNewCoupon(newCoupon), HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateCoupon(@PathVariable long id, @RequestBody Coupon coupon) {
		return new ResponseEntity<>(couponService.updateCoupon(id, coupon), HttpStatus.OK);
	}

	@GetMapping("/block/{id}")
	public ResponseEntity<?> blockTheCoupon(@PathVariable long id){
		boolean blocked=couponService.blockTheCoupon(id);
		if(blocked) {
			return new ResponseEntity<>("Ok",HttpStatus.OK);
		}
		return new ResponseEntity<>(Map.entry("Message", "Coupon Not found."),HttpStatus.NOT_FOUND);
	}

	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteCouponById(@PathVariable long id) {
		return new ResponseEntity<>(couponService.deleteCouponById(id), HttpStatus.OK);
	}
	
	
}
