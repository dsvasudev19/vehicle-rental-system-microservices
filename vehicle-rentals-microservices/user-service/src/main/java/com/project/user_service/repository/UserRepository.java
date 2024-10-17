package com.project.user_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.user_service.entity.EndUser;

@Repository
public interface UserRepository extends JpaRepository<EndUser,Long>{
	Optional<EndUser> findByEmail(String email);
}
