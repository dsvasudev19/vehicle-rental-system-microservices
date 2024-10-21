package com.project.authentication_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.authentication_service.models.UserPojo;

@FeignClient(value = "users-service", url = "http://localhost:9000/users")
public interface UserClient {
	@GetMapping("/{id}")
	public UserPojo getAUser(@PathVariable long id);
	
	@GetMapping("/email/{email}")
	public UserPojo getUserByUsername(@PathVariable String email);
}
