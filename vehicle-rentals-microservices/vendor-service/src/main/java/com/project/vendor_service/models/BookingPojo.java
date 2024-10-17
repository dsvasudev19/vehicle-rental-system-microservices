package com.project.vendor_service.models;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data


public class BookingPojo {
		private long id;
		private long vehicleId;
		private long userId;
		private LocalDateTime bookingDate;
		private LocalDateTime fromDate;
		private LocalDateTime toDate;
		private double durationHrs;
		private double price;
		private LocalDateTime createDate;
		private String status;
		
}
