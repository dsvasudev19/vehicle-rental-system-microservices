package com.project.authentication_service.models;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class ForgotPasswordTokenPojo {
	
	private long id;
	private String username;
	private String token;
	private LocalDate expiryDate;

}
