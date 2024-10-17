package com.project.authentication_service.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.authentication_service.entity.UserCredential;
import com.project.authentication_service.models.UserCredentialPojo;
import com.project.authentication_service.repository.UserCredentialRepository;

@Service
public class UserCredentialService {

	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserCredentialRepository userRepository;

	public UserCredentialPojo registerNewUser(UserCredentialPojo userCredential) {
		UserCredential user=new UserCredential();
		BeanUtils.copyProperties(userCredential, user);
		userRepository.save(user);
		user.setPassword(null);
		UserCredentialPojo pojo=new UserCredentialPojo();
		BeanUtils.copyProperties(user, pojo);
		return pojo;
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
