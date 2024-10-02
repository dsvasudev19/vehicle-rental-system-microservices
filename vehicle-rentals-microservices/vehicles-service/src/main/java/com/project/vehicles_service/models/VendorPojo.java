package com.project.vehicles_service.models;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data


public class VendorPojo {
	private long vendorId;
	private String name;
	private String email;
	private String password;
	private String phone;
	private LocalDateTime createdAt;
	private LocalDateTime updateAt;
	private LocalDateTime deletedAt;
	
	private List<VehiclePojo> vehicles;
}
