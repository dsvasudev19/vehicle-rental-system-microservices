package com.project.mail_service.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class JavaMailMessage {
	private String to;
	private String subject;
	private String body;
	
}
