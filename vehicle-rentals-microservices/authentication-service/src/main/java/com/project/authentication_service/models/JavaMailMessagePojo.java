package com.project.authentication_service.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class JavaMailMessagePojo {
	private String to;
	private String subject;
	private String body;
}
