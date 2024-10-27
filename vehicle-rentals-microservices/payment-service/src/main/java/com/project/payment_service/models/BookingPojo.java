package com.project.payment_service.models;

import java.time.LocalDateTime;

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
	private String name;
	private String email;
	private String phone;
	
	private UserPojo user;

	private VehiclePojo vehicle;
}
