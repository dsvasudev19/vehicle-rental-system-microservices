package com.project.authentication_service.models;

import java.util.List;

import com.project.authentication_service.entity.Role;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
