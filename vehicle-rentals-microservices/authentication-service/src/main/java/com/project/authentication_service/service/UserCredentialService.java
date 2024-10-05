package com.project.authentication_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.authentication_service.entity.UserCredential;
import com.project.authentication_service.repository.UserCredentialRepository;

@Service
public class UserCredentialService {

	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserCredentialRepository userRepository;

	public UserCredential registerNewUser(UserCredential user) {
		userRepository.save(user);
		user.setPassword(null);
		return user;
	}
	
	public String validateUser(UserCredential user) {
		Authentication auth=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		if(auth.isAuthenticated()) {
			
			return jwtService.createToken(user.getUsername());
		}
		return null;
	}
	
	public boolean validateToken(String token) {
		jwtService.validateToken(token);
		return true;
	}

}
