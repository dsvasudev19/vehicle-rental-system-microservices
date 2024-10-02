package com.project.bookings_service.model;

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

	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserPojo user;

	@ManyToOne
	@JoinColumn(name = "vehicle_id")
	private VehiclePojo vehicle;
}
