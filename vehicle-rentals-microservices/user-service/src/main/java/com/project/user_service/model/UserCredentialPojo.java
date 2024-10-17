package com.project.user_service.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class UserCredentialPojo {
	
	private long id;
	private String username;
	private String password;

	private List<RolePojo> roles;
}
