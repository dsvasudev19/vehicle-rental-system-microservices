package com.project.authentication_service.models;

import java.util.List;

import com.project.authentication_service.entity.UserCredential;

import jakarta.persistence.ManyToMany;

public class RolePojo {
	private long roleId;
	private String name;

	private List<UserCredential> usersCrentials;

}
