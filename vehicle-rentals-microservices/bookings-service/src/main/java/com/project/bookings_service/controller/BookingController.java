package com.project.bookings_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookings_service.model.BookingPojo;
import com.project.bookings_service.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
	
	@Autowired
	BookingService bookingService;
	
	@GetMapping
	public ResponseEntity<List<BookingPojo>> getAllBookings(){
		List<BookingPojo> bookingPojos=bookingService.getAllBookings();
		return new ResponseEntity<List<BookingPojo>>(bookingPojos,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<BookingPojo> getABooking(@PathVariable("id") long bookingId){
		BookingPojo bookingPojo=bookingService.getABooking(bookingId);
		return new ResponseEntity<BookingPojo>(bookingPojo,HttpStatus.OK);
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<BookingPojo>getBookingByUserId(@PathVariable("id") long userId){
		BookingPojo bookingPojo=bookingService.getBookingByUserId(userId);
		return new ResponseEntity<BookingPojo>(bookingPojo,HttpStatus.OK);
	}
	
	@GetMapping("users/vehicle/{id}")
	public ResponseEntity<BookingPojo>getBookingByVehicleId(@PathVariable ("id")long vehicleId){
		BookingPojo bookingPojo=bookingService.getBookingByVehicleId(vehicleId);
		return new ResponseEntity<BookingPojo>(bookingPojo,HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<BookingPojo> addBooking(@RequestBody BookingPojo bookingPojo){
		BookingPojo pojo=bookingService.addBooking(bookingPojo);
		return new ResponseEntity<BookingPojo>(pojo,HttpStatus.CREATED);
	}
	
	
	@PutMapping
	public ResponseEntity<BookingPojo>updateBooking(@RequestBody BookingPojo bookingPojo){
		BookingPojo pojo=bookingService.updateBooking(bookingPojo);
		return new ResponseEntity<BookingPojo>(pojo,HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<?>deleteBooking(long bookingId){
		bookingService.deleteBooking(bookingId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
