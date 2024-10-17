package com.project.user_service.model;

import java.time.LocalDateTime;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class BookingPojo {
	private long bookingId;
	private LocalDateTime bookingDate;
	private LocalDateTime fromDate;
	private LocalDateTime toDate;
	private double duartionHours;
	private double price;
	private long userId;
	private long vehicleId;
	private UserPojo user;

	private VehiclePojo vehicle;
}
