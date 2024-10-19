package com.project.user_service.service;

import java.util.List;

import com.project.user_service.model.UserPojo;

public interface UserServiceInter {
		List<UserPojo> getAllUsers();
		UserPojo getAUser(long userId);
		UserPojo addUser(UserPojo userPojo);
		UserPojo updateUser(UserPojo userPojo);
		void deleteUser(long userId);
		boolean checkIfUserExists(String email);
}
