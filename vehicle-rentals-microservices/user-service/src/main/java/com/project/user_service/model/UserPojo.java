package com.project.user_service.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;


import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class UserPojo {
	private long userId;
	private String name;
	private String email;
	private String phone;
	private LocalDateTime createdAt;
	
	@OneToMany(mappedBy = "user")
	private List<BookingPojo> bookings;
	
	
}
