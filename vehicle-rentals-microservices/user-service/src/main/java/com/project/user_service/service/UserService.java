package com.project.user_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.user_service.entity.EndUser;
import com.project.user_service.model.UserPojo;
import com.project.user_service.repository.UserRepository;

@Service
public class UserService implements UserServiceInter{

	@Autowired
	UserRepository userRepositoryInter;
	
	@Override
	public List<UserPojo> getAllUsers() {
		List<EndUser> userEntity= userRepositoryInter.findAll();
		List<UserPojo> userPojos=new ArrayList<>();
		userEntity.stream().forEach(entity->{
			UserPojo userPojo=new UserPojo();
			BeanUtils.copyProperties(entity, userPojo);
			userPojos.add(userPojo);
		});
		return userPojos;
		
	}

	@Override
	public UserPojo getAUser(long userId) {
		Optional<EndUser> usersEntity=userRepositoryInter.findById(userId);
		if(!usersEntity.isPresent())
			return null;
		UserPojo userPojo=new UserPojo();
		BeanUtils.copyProperties(usersEntity.get(), userPojo);
		return userPojo;
		
		
	}
	
	/*
	 * public UserPojo getUserByBookingId(long bookingId) { Optional<UsersEntity>
	 * entity=userRepositoryInter.findByBookingId(bookingId); UserPojo userPojo=new
	 * UserPojo(); BeanUtils.copyProperties(entity.get(), userPojo); return
	 * userPojo;
	 * 
	 * }
	 */
	
	@Override
	public UserPojo addUser(UserPojo userPojo) {
		EndUser usersEntity=new EndUser();
		Optional<EndUser> userFound=userRepositoryInter.findByEmail(userPojo.getEmail());
		if(userFound.isPresent()) {
			return null;
		}
		BeanUtils.copyProperties(userPojo, usersEntity);
		userRepositoryInter.save(usersEntity);
		return userPojo;
	}

	@Override
	public UserPojo updateUser(UserPojo userPojo) {
		EndUser usersEntity=new EndUser();
		BeanUtils.copyProperties(userPojo, usersEntity);
		userRepositoryInter.saveAndFlush(usersEntity);
		return userPojo;
	}

	@Override
	public void deleteUser(long userId) {
		userRepositoryInter.deleteById(userId);
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public boolean checkIfUserExists(String email) {
		Optional<EndUser> userOptional=userRepositoryInter.findByEmail(email);
		if(userOptional.isPresent()) {
			return true;
		}
		return false;
	}

	@Override
	public UserPojo getUserByEmail(String email) {
		Optional<EndUser> userOptional=userRepositoryInter.findByEmail(email);
		if(userOptional.isPresent()) {
			UserPojo user=new UserPojo();
			BeanUtils.copyProperties(userOptional.get(), user);
			return user;
		}
		return null;
	}
	
}
