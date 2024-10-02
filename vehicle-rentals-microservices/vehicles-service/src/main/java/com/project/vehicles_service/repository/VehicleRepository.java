package com.project.vehicles_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.vehicles_service.entity.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

	Optional<Vehicle> findByType(String type);

	Optional<Vehicle> findByRegNo(String regNum);

	List<Vehicle> findByLocation(String location);

	List<Vehicle> findByPincode(String pincode);
	
	List<Vehicle> findByVendorId(long vendorId);

}
