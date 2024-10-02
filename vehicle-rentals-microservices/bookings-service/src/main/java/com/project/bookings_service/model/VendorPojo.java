package com.project.bookings_service.model;

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
	private String phone;
	private LocalDateTime createAt;
	private LocalDateTime updatedAt;
	private LocalDateTime deletedAt;
	
	@OneToMany(mappedBy = "vendor")
	List<VehiclePojo> vehicles;
	
	
	
}
