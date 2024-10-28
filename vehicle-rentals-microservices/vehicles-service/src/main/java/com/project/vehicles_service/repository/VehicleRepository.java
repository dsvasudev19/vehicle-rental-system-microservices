package com.project.vehicles_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.vehicles_service.entity.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

	Optional<Vehicle> findByType(String type);

	Optional<Vehicle> findByRegNo(String regNum);

	List<Vehicle> findByLocation(String location);

	List<Vehicle> findByPincode(String pincode);

	List<Vehicle> findByVendorId(long vendorId);

	List<Vehicle> findByName(String name);

	@Query("SELECT v FROM Vehicle v WHERE " + "LOWER(v.location) LIKE LOWER(CONCAT('%', :searchString, '%')) OR "
			+ "LOWER(v.pincode) LIKE LOWER(CONCAT('%', :searchString, '%')) OR "
			+ "LOWER(v.name) LIKE LOWER(CONCAT('%', :searchString, '%')) OR "
			+ "LOWER(v.type) LIKE LOWER(CONCAT('%', :searchString, '%'))")
	List<Vehicle> searchByCriteria(@Param("searchString") String searchString);

}
