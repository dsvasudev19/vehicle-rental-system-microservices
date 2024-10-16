package com.project.payment_service.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

@Entity
public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private long transactionId;
	private long userId;
	private String currency;
	private double amount;
	private String status;
	private String orderId;
	@CreatedDate
	private LocalDateTime createdAt;
	@UpdateTimestamp
	private LocalDateTime updatedAt;
	
	
	
	@PrePersist
	public void updateDates() {
		this.createdAt=LocalDateTime.now();
	}
//	
//	@PreUpdate
//	public void updateDate() {
//		this.updatedAt=LocalDateTime.now();
//	}
}
