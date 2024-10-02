package com.project.bookings_service.service;

import java.util.List;

import com.project.bookings_service.model.BookingPojo;

public interface BookingServiceInter {
	
	List<BookingPojo> getAllBookings();
	BookingPojo getABooking(long bookingId);
	BookingPojo getBookingByUserId(long userId);
	BookingPojo addBooking(BookingPojo bookingPojo);
	BookingPojo updateBooking(BookingPojo bookingPojo);
	void deleteBooking(long bookingId);
	
}
