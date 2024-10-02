package com.project.vendor_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.vendor_service.entity.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

	Optional<Vendor> findByEmail(String email);

	Optional<Vendor> findByName(String name);

}
