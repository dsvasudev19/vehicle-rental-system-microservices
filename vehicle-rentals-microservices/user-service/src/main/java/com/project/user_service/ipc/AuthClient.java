package com.project.user_service.ipc;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.user_service.model.UserCredentialPojo;


@FeignClient(value = "authentication-service",url = "http://localhost:9000/auth")
public interface AuthClient {
	@PostMapping("/user/register")
	public UserCredentialPojo registerNewUser(@RequestBody UserCredentialPojo user);
}
