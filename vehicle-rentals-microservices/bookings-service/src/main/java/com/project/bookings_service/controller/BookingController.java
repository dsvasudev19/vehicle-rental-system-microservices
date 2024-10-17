package com.project.bookings_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookings_service.client.MailClient;
import com.project.bookings_service.client.UserClient;
import com.project.bookings_service.client.VehicleClient;
import com.project.bookings_service.model.BookingPojo;
import com.project.bookings_service.model.JavaMailMessagePojo;
import com.project.bookings_service.model.UserPojo;
import com.project.bookings_service.model.VehiclePojo;
import com.project.bookings_service.service.BookingService;

@RestController
@RequestMapping("/bookings")
public class BookingController {

	@Autowired
	BookingService bookingService;

	@Autowired
	private MailClient mailClient;

	@Autowired
	private UserClient userClient;

	@Autowired
	private VehicleClient vehicleClient;

	@GetMapping("/greet")
	public String greet() {
		return "Hello! From Booking Service..............";
	}

	@GetMapping
	public ResponseEntity<?> getAllBookings() {
		List<BookingPojo> bookingPojos = bookingService.getAllBookings();
		return new ResponseEntity<>(bookingPojos, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getABooking(@PathVariable("id") long bookingId) {
		BookingPojo bookingPojo = bookingService.getABooking(bookingId);
		return new ResponseEntity<BookingPojo>(bookingPojo, HttpStatus.OK);
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<?> getBookingByUserId(@PathVariable("id") long userId) {
		List<?> bookingPojo = bookingService.getBookingByUserId(userId);
		return new ResponseEntity<>(bookingPojo, HttpStatus.OK);
	}

	@GetMapping("/vehicle/{id}")
	public ResponseEntity<?> getBookingByVehicleId(@PathVariable("id") long vehicleId) {
		List<BookingPojo> bookingPojo = bookingService.getBookingsByVehicleId(vehicleId);
		return new ResponseEntity<>(bookingPojo, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<?> addBooking(@RequestBody BookingPojo bookingPojo) {
		UserPojo userPojo = userClient.getAUser(bookingPojo.getUserId());
		VehiclePojo vehiclePojo = vehicleClient.getVehicleById(bookingPojo.getVehicleId());
		BookingPojo pojo = bookingService.addBooking(bookingPojo);
		if (pojo != null) {
			JavaMailMessagePojo messagePojo = new JavaMailMessagePojo();
			messagePojo.setTo(userPojo.getEmail());
			messagePojo.setSubject("Status of your Recent Booking");
			messagePojo.setBody("Your Booking of " + vehiclePojo.getName() + " from Date: " + bookingPojo.getFromDate()
					+ " to Date: " + bookingPojo.getToDate() + " is Confirmed. Your Booking Id: "
					+ pojo.getBookingId());
			mailClient.sendMailMessage(messagePojo);
			return new ResponseEntity<BookingPojo>(pojo, HttpStatus.CREATED);
		}
		return ResponseEntity.noContent().build();
	}

	@PutMapping
	public ResponseEntity<?> updateBooking(@RequestBody BookingPojo bookingPojo) {
		BookingPojo pojo = bookingService.updateBooking(bookingPojo);
		return new ResponseEntity<BookingPojo>(pojo, HttpStatus.OK);
	}

	@DeleteMapping("/{bookingId}")
	public ResponseEntity<?> deleteBooking(long bookingId) {
		bookingService.deleteBooking(bookingId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PatchMapping("/status/{id}")
	public ResponseEntity<?> updateStatusOfBooking(@PathVariable long id, @RequestParam String status) {
		BookingPojo newStatus = bookingService.updateStatusOfBooking(id, status);
		return new ResponseEntity<>(newStatus, HttpStatus.OK);
	}

}
