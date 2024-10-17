package com.project.vehicles_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

@Entity
public class Vehicle {
	@Id
	private long vehicleId;
	private String name;
	private String regNo;
	private int wheelCount;
	private String type;
	private String location;
	private String pincode;
	private String description;
	private double pricePerHr;
	private long vendorId;
	private String imagePath;
}
