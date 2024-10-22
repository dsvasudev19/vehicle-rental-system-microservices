package com.project.authentication_service.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.project.authentication_service.entity.ForgotPasswordToken;
import com.project.authentication_service.entity.Role;
import com.project.authentication_service.entity.UserCredential;
import com.project.authentication_service.models.ForgotPasswordTokenPojo;
import com.project.authentication_service.models.ResetPassword;
import com.project.authentication_service.models.RolePojo;
import com.project.authentication_service.models.UserCredentialPojo;
import com.project.authentication_service.models.UserPojo;
import com.project.authentication_service.repository.ForgotPasswordTokenRepository;
import com.project.authentication_service.repository.UserCredentialRepository;

@Service
public class UserCredentialService {

	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserCredentialRepository userRepository;

	@Autowired
	private ForgotPasswordTokenRepository tokenRepository;

	public UserCredentialPojo registerNewUser(UserCredentialPojo userCredential) {
		UserCredential user = new UserCredential();
		BeanUtils.copyProperties(userCredential, user);
		List<RolePojo> rolesPojo = userCredential.getRoles();
		List<Role> roles = rolesPojo.stream().map(rolePojo -> {
			Role role = new Role();
			BeanUtils.copyProperties(rolePojo, role);
			return role;
		}).collect(Collectors.toList());
		user.setRoles(roles);
		userRepository.save(user);
		user.setPassword(null);
		UserCredentialPojo pojo = new UserCredentialPojo();
		BeanUtils.copyProperties(user, pojo);
		return pojo;
	}

	public String validateUser(UserCredentialPojo user) {
		Authentication auth = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		if (auth.isAuthenticated()) {

			return jwtService.createToken(user.getUsername());
		}
		return null;
	}

	public ForgotPasswordTokenPojo generateForgotPasswordToken(String username) {
		Optional<UserCredential> userCredential = userRepository.findByUsername(username);
		if (userCredential.isPresent()) {
			String token = UUID.randomUUID().toString();
			ForgotPasswordToken forgotPasswordToken = new ForgotPasswordToken();
			forgotPasswordToken.setUsername(username);
			forgotPasswordToken.setToken(token);
			forgotPasswordToken.setExpiryDate(LocalDate.now().plusDays(1));
			tokenRepository.save(forgotPasswordToken);
			ForgotPasswordTokenPojo pojo = new ForgotPasswordTokenPojo();
			BeanUtils.copyProperties(forgotPasswordToken, pojo);
			return pojo;
		}
		return null;
	}

	public String verifyToken(String token) {
		Optional<ForgotPasswordToken> tokenFound = tokenRepository.findByToken(token);
		if (tokenFound.isPresent()) {
			ForgotPasswordToken foundToken = tokenFound.get();
			if (LocalDate.now().isBefore(foundToken.getExpiryDate())) {
				return foundToken.getUsername();
			}
		}
		return null;
	}

	public boolean resetPassword(String token, ResetPassword resetPassword) {
		String username = resetPassword.getUsername();
		Optional<UserCredential> userCredentialPojo = userRepository.findByUsername(username);
		Optional<ForgotPasswordToken> tokenOptional = tokenRepository.findByToken(token);
		if (userCredentialPojo.isPresent() && tokenOptional.isPresent()
				&& LocalDate.now().isBefore(tokenOptional.get().getExpiryDate())) {
			UserCredential userPojo = userCredentialPojo.get();
			userPojo.setPassword(resetPassword.getPassword());
			userRepository.saveAndFlush(userPojo);
			return true;
		}
		return false;
	}

	public boolean validateToken(String token) {
		jwtService.validateToken(token);
		return true;
	}

	public String getUserId(String token) {
		return jwtService.getUserId(token);
	}

}
