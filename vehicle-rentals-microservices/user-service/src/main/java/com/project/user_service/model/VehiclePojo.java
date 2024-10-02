package com.project.user_service.model;

import java.util.List;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

public class VehiclePojo {
	private long vehicleId;
	private String name;
	private String regNo;
	private int wheelCount;
	private String type;
	private String location;
	private String pincode;
	private String description;
	private double pricePerHr;
	
	@ManyToOne
	@JoinColumn(name="vendorId")
	VendorPojo vendor;
	
	@OneToMany(mappedBy = "vehicle")
	private List<BookingPojo> bookings;
}
