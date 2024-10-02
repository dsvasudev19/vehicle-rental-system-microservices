package com.project.bookings_service.entity;

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
public class BookingEntity {
	@Id
	private long bookingId;
	private LocalDateTime bookingDate;
	private LocalDateTime fromDate;
	private LocalDateTime toDate;
	private double duartionHours;
	private double price;
	private long userId;
	private long vehicleId;
	
}
