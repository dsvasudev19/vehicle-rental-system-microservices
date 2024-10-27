package com.project.review_service.models;

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
	private String username;
	private int rating;
	private String content;
	private Date postedOn;

}
