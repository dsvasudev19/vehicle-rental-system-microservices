package com.project.bookings_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.bookings_service.entity.BookingEntity;
import com.project.bookings_service.model.BookingPojo;
import com.project.bookings_service.repository.BookingRepositoryInter;

@Service
public class BookingService implements BookingServiceInter {

    @Autowired
    BookingRepositoryInter bookingRepositoryInter;

    @Override
    public List<BookingPojo> getAllBookings() {
        List<BookingEntity> bookingEntities = bookingRepositoryInter.findAll();
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
        Optional<BookingEntity> bookingEntity = bookingRepositoryInter.findById(bookingId);
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
        List<BookingEntity> bookingEntities = bookingRepositoryInter.findByUserId(userId);
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
        List<BookingEntity> bookingEntities = bookingRepositoryInter.findByVehicleId(vehicleId);
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
        BookingEntity bookingEntity = new BookingEntity();
        BeanUtils.copyProperties(bookingPojo, bookingEntity);
        bookingRepositoryInter.save(bookingEntity);
        return bookingPojo;
    }

    @Override
    public BookingPojo updateBooking(BookingPojo bookingPojo) {
        BookingEntity bookingEntity = new BookingEntity();
        BeanUtils.copyProperties(bookingPojo, bookingEntity);
        bookingRepositoryInter.saveAndFlush(bookingEntity);
        return bookingPojo;
    }

    @Override
    public void deleteBooking(long bookingId) {
        bookingRepositoryInter.deleteById(bookingId);
    }
}
