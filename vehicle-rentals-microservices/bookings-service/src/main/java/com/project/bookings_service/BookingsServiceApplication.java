package com.project.bookings_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class BookingsServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookingsServiceApplication.class, args);
	}

}
