package com.project.mail_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.mail_service.models.JavaMailMessage;

@RestController
@RequestMapping("/mail")
public class MailController {

	@Autowired
	private MailService mailService;
	
	@GetMapping("/greet")
	public String greet() {
		return "Hello! From Mail Service..............";
	}

	@PostMapping("/send-mail")
	public ResponseEntity<?> sendMailMessage(@RequestBody JavaMailMessage message) {
		System.out.println("Coming till here");
		boolean sent=mailService.sendMail(message);
		return new ResponseEntity<>(sent, HttpStatus.OK);
	}

}
