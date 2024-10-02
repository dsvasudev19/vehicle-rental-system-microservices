package com.project.customer_support.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.customer_support.models.CustomerSupport;

@Repository
public interface CustomerSupportRepository extends JpaRepository<CustomerSupport, Long> {
	
	List<CustomerSupport> findByCustomerName(String name);

	@Query("Select c from CustomerSupport c where c.subject like :subject%")
	List<CustomerSupport> findBySubjectContaining(@Param("subject") String subject);

}
