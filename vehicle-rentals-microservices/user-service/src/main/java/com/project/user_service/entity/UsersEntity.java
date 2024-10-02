package com.project.user_service.entity;

import java.time.LocalDateTime;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

@Entity
public class UsersEntity {
	@Id
	private long userId;
	private String name;
	private String email;
	private String phone;
	private LocalDateTime createdAt;

	
}
