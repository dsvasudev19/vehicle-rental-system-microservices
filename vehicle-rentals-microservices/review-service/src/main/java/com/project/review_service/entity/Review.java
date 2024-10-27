package com.project.review_service.entity;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data


@Entity
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private long vehicleId;
	private long userId;
	private String username;
	private int rating;
	private String content;
	private Date postedOn;
	
	@PrePersist
	public void setPostedOn() {
		this.postedOn=new Date(System.currentTimeMillis());
	}
}
