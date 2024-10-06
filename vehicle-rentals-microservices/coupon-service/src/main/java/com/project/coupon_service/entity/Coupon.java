package com.project.coupon_service.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data


@Entity
public class Coupon {
	@Id
	private long id;
	private String code;
	private String type;
	private double discount;
	private double minPurchaseValue;
	private double maxDiscountValue;
	private LocalDateTime expiryDate;
	
}
