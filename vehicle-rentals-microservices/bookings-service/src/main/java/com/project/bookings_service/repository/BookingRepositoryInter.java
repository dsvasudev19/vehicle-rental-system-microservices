package com.project.bookings_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bookings_service.entity.BookingEntity;


@Repository
public interface BookingRepositoryInter extends JpaRepository<BookingEntity,Long>{
	Optional<BookingEntity> findByUserId(long userId);
	Optional<BookingEntity> findByVehicleId(long vehicleId);
}
