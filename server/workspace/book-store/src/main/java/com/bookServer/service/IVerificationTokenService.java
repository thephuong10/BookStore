package com.bookServer.service;

import java.util.Optional;

import com.bookServer.entity.VerificationTokenEntity;

public interface IVerificationTokenService {
	

	
	Optional<VerificationTokenEntity> save(VerificationTokenEntity payload);
	
	
	Optional<VerificationTokenEntity> findOneByCodeAndEmail(String code,String email);
	
	Boolean delete(String email);
	
	Boolean existsByEmail(String email);
	
	VerificationTokenEntity findOneByEmail(String email);
	
	long countByEmail(String email);
	
}
