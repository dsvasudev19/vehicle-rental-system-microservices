package com.project.bookings_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.bookings_service.model.UserPojo;

@FeignClient(value = "users-service",url = "http://localhost:9000/users")
public interface UserClient {
	@GetMapping("/{id}")
	public UserPojo getAUser(@PathVariable("id") long userID);
}
