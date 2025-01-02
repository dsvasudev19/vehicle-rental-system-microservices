package com.project.vendor_service.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data


public class RolePojo {
	
	private long roleId;
	private String name;
	private List<UserCredentialPojo> usersCrentials;

}
