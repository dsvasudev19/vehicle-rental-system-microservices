package com.project.coupon_service.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

@Entity
public class Coupon {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String code;
	private String type;
	private double discount;
	private double minPurchaseValue;
	private double maxDiscountValue;
	private LocalDateTime expiryDate;
	private boolean expired;

	@PrePersist
	public void updateExpiryStatus() {
		this.expired=false;
	}

}
