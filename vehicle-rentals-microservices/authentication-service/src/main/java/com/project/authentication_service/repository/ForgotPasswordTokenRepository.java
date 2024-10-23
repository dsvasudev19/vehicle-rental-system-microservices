package com.project.authentication_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.authentication_service.entity.ForgotPasswordToken;

@Repository
public interface ForgotPasswordTokenRepository extends JpaRepository<ForgotPasswordToken, Long> {
	Optional<ForgotPasswordToken> findByToken(String token);
	void deleteByUsername(String username); 
}
