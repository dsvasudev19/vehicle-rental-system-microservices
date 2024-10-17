package com.project.vehicles_service.ipc;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.vehicles_service.models.ReviewPojo;

@FeignClient(value = "review-service",url = "http://localhost:9000/review")
public interface ReviewClient {
	@GetMapping("/vehicle/{vehicleId}")
	public List<ReviewPojo> getReviewsOfVehicle(@PathVariable long vehicleId);
}
