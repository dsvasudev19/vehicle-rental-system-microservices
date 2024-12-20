package com.project.vendor_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vendor_service.entity.Vendor;
import com.project.vendor_service.feign.VehicleClient;
import com.project.vendor_service.models.VehiclePojo;
import com.project.vendor_service.models.VendorPojo;
import com.project.vendor_service.models.VendorWrapper;
import com.project.vendor_service.repository.VendorRepository;

@Service
public class VendorService {
	@Autowired
	private VendorRepository vendorRepository;

	public List<VendorPojo> getAllVendors() {
		List<Vendor> vendorsFound = vendorRepository.findAll();
		List<VendorPojo> vendors = new ArrayList<>();
		vendorsFound.stream().forEach((vendor) -> {
			VendorPojo pojo = new VendorPojo();
			BeanUtils.copyProperties(vendor, pojo);
			vendors.add(pojo);
		});
		return vendors;
	}

	public VendorPojo getVendorById(long id) {
		Optional<Vendor> vendorFound = vendorRepository.findById(id);
		if (vendorFound.isPresent()) {

			VendorPojo vendor = new VendorPojo();
			BeanUtils.copyProperties(vendorFound.get(), vendor);

			return vendor;
		}
		return null;
	}

	public VendorPojo addVendor(VendorPojo vendorPojo) {
		Vendor vendor = new Vendor();
		BeanUtils.copyProperties(vendorPojo, vendor);
		vendorRepository.save(vendor);
		return vendorPojo;

	}

	public VendorPojo updateVendorById(long id, VendorPojo vendorPojo) {
		Optional<Vendor> vendorFound = vendorRepository.findById(id);
		if (vendorFound.isPresent()) {
			Vendor vendor = vendorFound.get();
			BeanUtils.copyProperties(vendorPojo, vendor);
			// To Ensure Password is not affected with each update
			vendor.setPassword(vendorFound.get().getPassword());
			vendorRepository.saveAndFlush(vendor);
			return vendorPojo;
		}
		return null;
	}

	public VendorPojo getVendorByEmail(String email) {
		Optional<Vendor> vendorFound = vendorRepository.findByEmail(email);
		if (vendorFound.isPresent()) {
			VendorPojo vendor = new VendorPojo();
			BeanUtils.copyProperties(vendorFound.get(), vendor);
			return vendor;
		}
		return null;
	}

	public VendorPojo getVendorByName(String email) {
		Optional<Vendor> vendorFound = vendorRepository.findByName(email);
		if (vendorFound.isPresent()) {
			VendorPojo vendor = new VendorPojo();
			BeanUtils.copyProperties(vendorFound.get(), vendor);
			return vendor;
		}
		return null;
	}

	public boolean deleteVendorById(long id) {
		vendorRepository.deleteById(id);
		return true;
	}

	public boolean checkIfVendorExists(String email) {
		Optional<Vendor> vendorFound = vendorRepository.findByEmail(email);
		if (vendorFound.isPresent()) {
			return true;
		}
		return false;
	}

	public List<VendorWrapper> getVendorDetails() {
		List<Vendor> vendors = vendorRepository.findAll();
		List<VendorWrapper> allVendors = new ArrayList<>();
		vendors.stream().forEach(vendor -> {
			VendorWrapper wrapper = new VendorWrapper();
			BeanUtils.copyProperties(vendor, wrapper);
			allVendors.add(wrapper);
		});
		return allVendors;
	}
}
