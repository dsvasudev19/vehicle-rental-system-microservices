package com.project.authentication_service.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.elasticsearch.ElasticsearchProperties.Restclient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import com.project.authentication_service.client.UserClient;
import com.project.authentication_service.models.UserCredentialPojo;
import com.project.authentication_service.models.UserPojo;
import com.project.authentication_service.service.UserCredentialService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class UserCredentialController {
	
	@Autowired
	private UserCredentialService userCredentialService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserClient userClient;
	
	@GetMapping("/greet")
	public String greet() {
		return "Hello! From Authentication Service..............";
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody UserCredentialPojo user){
		return new ResponseEntity<>(Map.entry("token", userCredentialService.validateUser(user)),HttpStatus.OK);
	}
	
	@PostMapping("/user/register")
	public ResponseEntity<?> registerNewUser(@RequestBody UserCredentialPojo user){
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return new ResponseEntity<>(userCredentialService.registerNewUser(user),HttpStatus.OK);
	}
	
    @GetMapping("/user/token/{token}")
    public ResponseEntity<?> getUserByToken(@PathVariable String token){
          String username=userCredentialService.getUserId(token);
          RestClient restClient=RestClient.create();
//          UserPojo userPojo=restClient.get().uri("http://localhost:9000/users/email/"+username).retrieve().body(UserPojo.class);
//          UserPojo userPojo=userClient.getAUser(Long.valueOf(userId));
          UserPojo userPojo=userClient.getUserByUsername(username);
          if(userPojo!=null) {
        	  return new ResponseEntity<>(userPojo,HttpStatus.OK);
          }
          return ResponseEntity.noContent().build();
    }
	
	@GetMapping("/validate/token")
	public ResponseEntity<?> validateJwtToken(@RequestParam String token){
		return new ResponseEntity<>(userCredentialService.validateToken(token),HttpStatus.OK);
	}

}
