package com.project.authentication_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.authentication_service.entity.UserCredential;
import com.project.authentication_service.repository.UserCredentialRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserCredentialRepository credentialRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserCredential userFound=credentialRepo.findByUsername(username).get();
		if(userFound!=null) {
			return new CustomUserDetails(userFound);
		}
		throw new UsernameNotFoundException("User not found with the given Username");
	}
	

}
