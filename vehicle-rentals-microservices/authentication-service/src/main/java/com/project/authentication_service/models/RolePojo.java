package com.project.authentication_service.models;

import java.util.List;

import com.project.authentication_service.entity.UserCredential;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data


public class RolePojo {
	private long roleId;
	private String name;

	private List<UserCredential> usersCrentials;

}
