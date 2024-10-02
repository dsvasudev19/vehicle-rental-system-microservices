package com.project.vehicles_service.models;

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

	private UserPojo user;

	private VehiclePojo vehicle;
}
