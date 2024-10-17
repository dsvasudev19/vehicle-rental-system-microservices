package com.project.vehicles_service.models;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data


public class ReviewPojo {
	private long id;
	private long vehicleId;
	private long userId;
	private int rating;
	private String content;
	private Date postedOn;

}
