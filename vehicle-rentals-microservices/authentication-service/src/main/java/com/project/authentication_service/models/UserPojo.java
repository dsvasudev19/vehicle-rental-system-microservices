package com.project.authentication_service.models;

import java.time.LocalDateTime;

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
	
}
