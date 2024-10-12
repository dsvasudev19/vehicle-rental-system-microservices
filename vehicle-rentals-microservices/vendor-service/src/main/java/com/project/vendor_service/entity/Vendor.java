package com.project.vendor_service.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

@Entity
public class Vendor {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long vendorId;
	private String name;
	private String email;
	private String password;
	private String phone;
	private LocalDateTime createdAt;
	private LocalDateTime updateAt;
	private LocalDateTime deletedAt;

	@PrePersist
	public void updateDate() {
		this.createdAt=LocalDateTime.now();
		this.updateAt=LocalDateTime.now();
	}
}
