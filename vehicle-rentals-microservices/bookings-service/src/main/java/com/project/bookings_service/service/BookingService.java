package com.project.bookings_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.bookings_service.entity.BookingEntity;
import com.project.bookings_service.model.BookingPojo;
import com.project.bookings_service.repository.BookingRepositoryInter;


@Service
public class BookingService implements BookingServiceInter{

	@Autowired
	BookingRepositoryInter bookingRepositoryInter;
	
	@Override
	public List<BookingPojo> getAllBookings() {
		List<BookingEntity> bookingEntity=bookingRepositoryInter.findAll();
		List<BookingPojo>bookingPojo=new ArrayList<>();
		bookingEntity.stream().forEach(entity->{
			BookingPojo pojo=new BookingPojo();
			BeanUtils.copyProperties(entity, pojo);
			bookingPojo.add(pojo);
		});
		return bookingPojo;
	}

	@Override
	public BookingPojo getABooking(long bookingId) {
	Optional<BookingEntity> bookingEntity=bookingRepositoryInter.findById(bookingId);
	BookingPojo bookingPojo=new BookingPojo();
	BeanUtils.copyProperties(bookingEntity.get(), bookingPojo);
	return bookingPojo;
	}

	public BookingPojo getBookingByUserId(long userId) {
		Optional<BookingEntity> entity=bookingRepositoryInter.findByUserId(userId);
		BookingPojo bookingPojo=new BookingPojo();
		BeanUtils.copyProperties(entity, bookingPojo);
		return bookingPojo;
	}
	
	public BookingPojo getBookingByVehicleId(long vehicleId) {
		Optional<BookingEntity> entity=bookingRepositoryInter.findByVehicleId(vehicleId);
		BookingPojo bookingPojo=new BookingPojo();
		BeanUtils.copyProperties(entity, bookingPojo);
		return bookingPojo;
	}
	
	@Override
	public BookingPojo addBooking(BookingPojo bookingPojo) {
		BookingEntity bookingEntity=new BookingEntity();
		BeanUtils.copyProperties(bookingPojo, bookingEntity);
		bookingRepositoryInter.save(bookingEntity);
		return bookingPojo;
	}
	

	@Override
	public BookingPojo updateBooking(BookingPojo bookingPojo) {
		BookingEntity bookingEntity=new BookingEntity();
		BeanUtils.copyProperties(bookingPojo, bookingEntity);
		bookingRepositoryInter.saveAndFlush(bookingEntity);
		return bookingPojo;
	}

	@Override
	public void deleteBooking(long bookingId) {
		bookingRepositoryInter.deleteById(bookingId);
		
	}

}
