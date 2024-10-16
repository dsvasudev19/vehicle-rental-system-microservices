package com.project.payment_service.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class TransactionPojo {
	private long transactionId;
	private long userId;
	private String currency;
	private double amount;
	private String status;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;

}
