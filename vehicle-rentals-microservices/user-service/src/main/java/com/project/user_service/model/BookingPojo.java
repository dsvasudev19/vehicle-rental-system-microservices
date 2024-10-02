package com.project.user_service.model;

import java.time.LocalDateTime;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class BookingPojo {
	private long bookingId;
	private LocalDateTime bookingDate;
	private LocalDateTime from;
	private LocalDateTime toDestination;
	private double duartionHours;
	private double price;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserPojo user;
	
	@ManyToOne
	@JoinColumn(name = "vehicle_id")
	private VehiclePojo vehicle;
}
