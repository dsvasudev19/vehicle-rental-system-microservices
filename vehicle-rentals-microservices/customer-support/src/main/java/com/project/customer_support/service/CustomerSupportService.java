package com.project.customer_support.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.customer_support.models.CustomerSupport;
import com.project.customer_support.repository.CustomerSupportRepository;

@Service
public class CustomerSupportService {
	@Autowired
	private CustomerSupportRepository supportRepo;

	public List<CustomerSupport> getAll() {
		return supportRepo.findAll();
	}

	public CustomerSupport getById(long id) {
		Optional<CustomerSupport> enquiryFound = supportRepo.findById(id);
		if (enquiryFound.isPresent()) {
			return enquiryFound.get();
		}
		return null;
	}

	public boolean closeEnquiry(long id) {
		Optional<CustomerSupport> enquiryFound = supportRepo.findById(id);
		if (enquiryFound.isPresent()) {
			CustomerSupport enquiry = enquiryFound.get();
			enquiry.setStatus(true);
			supportRepo.save(enquiry);
			return true;
		}
		return false;
	}

	public List<CustomerSupport> getAllEnquiriesOfCustomer(String name) {
		List<CustomerSupport> enquiriesFound = supportRepo.findByCustomerName(name);
		return enquiriesFound;
	}

	public CustomerSupport postNewEnquiry(CustomerSupport pojo) {
		CustomerSupport enquiry = supportRepo.save(pojo);
		return enquiry;
	}

	public List<CustomerSupport> getAllEnquiriesByKeywords(String keyword){
		List<CustomerSupport> enquiries=supportRepo.findBySubjectContaining(keyword);
		return enquiries;
	}
	
}
