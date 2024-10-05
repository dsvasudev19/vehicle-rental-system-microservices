package com.project.mail_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.project.mail_service.models.JavaMailMessage;

@Service
public class MailService {
	@Autowired
	private JavaMailSender mailSender;
	
	SimpleMailMessage message=new SimpleMailMessage();
	
	public boolean sendMail(JavaMailMessage mailMessage) {
		message.setTo(mailMessage.getTo());
		message.setSubject(mailMessage.getSubject());
		message.setText(mailMessage.getBody());
		
		mailSender.send(message);
		return true;
	}
	

}
