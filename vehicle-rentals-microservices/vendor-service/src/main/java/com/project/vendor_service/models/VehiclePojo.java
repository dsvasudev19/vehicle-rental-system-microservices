package com.project.vendor_service.models;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class VehiclePojo {

	private long vehicleId;
	private String name;
	private String regNno;
	private int wheelCount;
	private String type;
	private String location;
	private String pincode;
	private String description;
	private double pricePerHour;

	
	private VendorPojo vendor;

}
