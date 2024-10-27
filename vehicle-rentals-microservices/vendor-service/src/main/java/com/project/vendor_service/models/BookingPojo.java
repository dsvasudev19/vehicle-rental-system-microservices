package com.project.vendor_service.models;

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
	private LocalDateTime from;
	private LocalDateTime toDestination;
	private double duartionHours;
	private double price;
	private String status;
	private long userId;
	private long vehicleId;
	
	private String name;
	private String email;
	private String phone;


	private VehiclePojo vehicle;
		
}
