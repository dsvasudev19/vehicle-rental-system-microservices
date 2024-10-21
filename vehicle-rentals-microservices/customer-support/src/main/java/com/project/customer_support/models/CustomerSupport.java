package com.project.customer_support.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

@Entity
public class CustomerSupport {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String customerName;
	private String email;
	private String subject;
	private String description;
	private boolean status;

}
