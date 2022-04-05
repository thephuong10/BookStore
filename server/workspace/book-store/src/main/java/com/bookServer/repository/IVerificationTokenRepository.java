package com.bookServer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookServer.entity.VerificationTokenEntity;



public interface IVerificationTokenRepository extends JpaRepository<VerificationTokenEntity, Long> {
	
	Optional<VerificationTokenEntity>findOneByCodeAndEmail(String code,String email);
	
	List<VerificationTokenEntity>findAllByEmail(String email);
	
	Boolean existsByEmail(String email);
	
	Optional<VerificationTokenEntity>findOneByEmail(String email);
	
	long countByEmail(String email);
	
	
}
