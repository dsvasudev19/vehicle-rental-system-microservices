package com.project.bookings_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bookings_service.entity.Booking;


@Repository
public interface BookingRepositoryInter extends JpaRepository<Booking,Long>{
	List<Booking> findByUserId(long userId);
	List<Booking> findByVehicleId(long vehicleId);
}
