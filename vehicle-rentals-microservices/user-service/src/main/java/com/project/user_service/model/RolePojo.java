package com.project.user_service.model;

import java.util.List;


import jakarta.persistence.ManyToMany;

public class RolePojo {
	private long roleId;
	private String name;

	private List<UserCredentialPojo> usersCrentials;

}
