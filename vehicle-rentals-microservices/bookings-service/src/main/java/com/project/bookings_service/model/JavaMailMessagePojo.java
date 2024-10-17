package com.project.bookings_service.model;

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
