package com.project.user_service.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.user_service.model.UserPojo;
import com.project.user_service.service.UserService;



@RestController
@RequestMapping("/users")
public class UserController {
	
	
	@Autowired
	UserService userService;
	
	@GetMapping
	public ResponseEntity<List<UserPojo>> getAllUsers(){
		List<UserPojo> usersList=userService.getAllUsers();
		return new ResponseEntity<List<UserPojo>>(usersList,HttpStatus.OK);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<UserPojo> getAUser(@PathVariable("id")long userID){
		UserPojo userPojo =userService.getAUser(userID);
		return new ResponseEntity<UserPojo>(userPojo,HttpStatus.OK);
	}
	
	
	@PostMapping
	public ResponseEntity<UserPojo> addUser( @RequestBody UserPojo userPojo){
		UserPojo userP=userService.addUser(userPojo);
		return new ResponseEntity<UserPojo>(userP,HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<UserPojo> updateUser(@RequestBody UserPojo userPojo){
		UserPojo userP=userService.updateUser(userPojo);
		return new ResponseEntity<UserPojo>(userP,HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public void deleteUser(@PathVariable("id")long userId) {
		userService.deleteUser(userId);
	}
}
