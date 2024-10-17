package com.project.bookings_service.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.bookings_service.entity.Booking;
import com.project.bookings_service.model.BookingPojo;
import com.project.bookings_service.repository.BookingRepositoryInter;

@Service
public class BookingService implements BookingServiceInter {

    @Autowired
    BookingRepositoryInter bookingRepositoryInter;

    @Override
    public List<BookingPojo> getAllBookings() {
        List<Booking> bookingEntities = bookingRepositoryInter.findAll();
        return bookingEntities.stream()
            .map(entity -> {
                BookingPojo pojo = new BookingPojo();
                BeanUtils.copyProperties(entity, pojo);
                return pojo;
            })
            .collect(Collectors.toList());
    }

    @Override
    public BookingPojo getABooking(long bookingId) {
        Optional<Booking> bookingEntity = bookingRepositoryInter.findById(bookingId);
        if (bookingEntity.isPresent()) {
            BookingPojo bookingPojo = new BookingPojo();
            BeanUtils.copyProperties(bookingEntity.get(), bookingPojo);
            return bookingPojo;
        } else {
            // Handle case where booking is not found, can throw an exception or return null
            return null;
        }
    }

    @Override
    public List<BookingPojo> getBookingByUserId(long userId) {
        List<Booking> bookingEntities = bookingRepositoryInter.findByUserId(userId);
        return bookingEntities.stream()
            .map(entity -> {
                BookingPojo pojo = new BookingPojo();
                BeanUtils.copyProperties(entity, pojo);
                return pojo;
            })
            .collect(Collectors.toList());
    }

    @Override
    public List<BookingPojo> getBookingsByVehicleId(long vehicleId) {
        List<Booking> bookingEntities = bookingRepositoryInter.findByVehicleId(vehicleId);
        return bookingEntities.stream()
            .map(entity -> {
                BookingPojo pojo = new BookingPojo();
                BeanUtils.copyProperties(entity, pojo);
                return pojo;
            })
            .collect(Collectors.toList());
    }

    @Override
    public BookingPojo addBooking(BookingPojo bookingPojo) {
        Booking bookingEntity = new Booking();
        BeanUtils.copyProperties(bookingPojo, bookingEntity);
        bookingEntity.setStatus("Created");
        bookingRepositoryInter.save(bookingEntity);
        return bookingPojo;
    }

    @Override
    public BookingPojo updateBooking(BookingPojo bookingPojo) {
        Booking bookingEntity = new Booking();
        BeanUtils.copyProperties(bookingPojo, bookingEntity);
        bookingRepositoryInter.saveAndFlush(bookingEntity);
        return bookingPojo;
    }

    @Override
    public void deleteBooking(long bookingId) {
        bookingRepositoryInter.deleteById(bookingId);
    }
    
    public BookingPojo updateStatusOfBooking(long bookingId,String status) {
    	Optional<Booking> booking=bookingRepositoryInter.findById(bookingId);
    	if(booking.isPresent()) {
    		BookingPojo pojo=new BookingPojo();
    		Booking foundBooking=booking.get();
    		foundBooking.setStatus(status);
    		bookingRepositoryInter.save(foundBooking);
    		BeanUtils.copyProperties(foundBooking, pojo);
    		return pojo;
    	}
    	return null;
    }
}
