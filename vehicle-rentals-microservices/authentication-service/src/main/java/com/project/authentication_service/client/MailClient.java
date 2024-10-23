package com.project.authentication_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.authentication_service.models.JavaMailMessagePojo;


@FeignClient(value = "mail-service",url = "http://localhost:9000/mail")
public interface MailClient {

	@PostMapping("/send-mail")
	public ResponseEntity<?> sendMailMessage(@RequestBody JavaMailMessagePojo pojoMessage);
}
