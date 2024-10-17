package com.project.user_service.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.user_service.ipc.AuthClient;
import com.project.user_service.ipc.BookingClient;
import com.project.user_service.model.BookingPojo;
import com.project.user_service.model.UserCredentialPojo;
import com.project.user_service.model.UserPojo;
import com.project.user_service.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	private BookingClient bookingClient;

	@Autowired
	private AuthClient authClient;

	@GetMapping("/greet")
	public String greet() {
		return "Hello! From User Service..............";
	}

	@GetMapping
	public ResponseEntity<?> getAllUsers() {
		List<UserPojo> usersList = userService.getAllUsers();
		return new ResponseEntity<List<UserPojo>>(usersList, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getAUser(@PathVariable("id") long userID) {
		UserPojo userPojo = userService.getAUser(userID);
		if (userPojo != null) {
			List<BookingPojo> bookingPojos = bookingClient.getBookingByUserId(userID);
			userPojo.setBookings(bookingPojos);
			return new ResponseEntity<>(userPojo, HttpStatus.OK);
		}
		return ResponseEntity.noContent().build();
	}

	@PostMapping
	public ResponseEntity<?> addUser(@RequestBody UserPojo userPojo) {
		boolean userExists = userService.checkIfUserExists(userPojo.getEmail());
		if (!userExists) {
			UserPojo userP = userService.addUser(userPojo);
			UserCredentialPojo pojo = new UserCredentialPojo();
			pojo.setUsername(userPojo.getEmail());
			pojo.setPassword(userPojo.getEmail());
			if (userP != null) {
				UserCredentialPojo userCredentialPojo = authClient.registerNewUser(pojo);
			}
			return new ResponseEntity<>(userP, HttpStatus.OK);
		}
		return new ResponseEntity<>(Map.entry("message", "User already Exists With Given mailId"),
				HttpStatusCode.valueOf(400));
	}

	@PutMapping
	public ResponseEntity<?> updateUser(@RequestBody UserPojo userPojo) {
		UserPojo userP = userService.updateUser(userPojo);
		return new ResponseEntity<>(userP, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable("id") long userId) {
		userService.deleteUser(userId);
	}
}
