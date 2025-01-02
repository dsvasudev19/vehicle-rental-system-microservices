package com.project.vendor_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.vendor_service.models.UserCredentialPojo;


@FeignClient(value = "authentication-service",url = "http://localhost:9000/auth")
public interface AuthClient {
	
	@PostMapping("/user/register")
	public ResponseEntity<?> registerNewUser(@RequestBody UserCredentialPojo user);

}

