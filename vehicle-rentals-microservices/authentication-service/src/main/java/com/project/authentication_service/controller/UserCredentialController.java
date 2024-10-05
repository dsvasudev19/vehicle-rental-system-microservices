package com.project.authentication_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.authentication_service.entity.UserCredential;
import com.project.authentication_service.service.JwtService;
import com.project.authentication_service.service.UserCredentialService;

@RestController
@RequestMapping("/auth")
public class UserCredentialController {
	
	@Autowired
	private UserCredentialService userCredentialService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@PostMapping("/user/register")
	public ResponseEntity<?> registerNewUser(@RequestBody UserCredential user){
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return new ResponseEntity<>(userCredentialService.registerNewUser(user),HttpStatus.OK);
	}
	
	@PostMapping("/user/validate")
	public ResponseEntity<?> validateUserCredentials(@RequestBody UserCredential user){
		return new ResponseEntity<>(userCredentialService.validateUser(user),HttpStatus.OK);
	}
	
	@GetMapping("/validate/token")
	public ResponseEntity<?> validateJwtToken(@RequestParam String token){
		return new ResponseEntity<>(userCredentialService.validateToken(token),HttpStatus.OK);
	}

}
