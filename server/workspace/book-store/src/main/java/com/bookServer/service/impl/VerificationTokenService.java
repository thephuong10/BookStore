package com.bookServer.service.impl;

import java.util.Date;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookServer.entity.VerificationTokenEntity;
import com.bookServer.exception.EntityNotFoundException;
import com.bookServer.repository.IVerificationTokenRepository;
import com.bookServer.service.IVerificationTokenService;

@Service
public class VerificationTokenService implements IVerificationTokenService {
	
	private long verificationTokenExpirationAt = 2 * 60 * 1000;
	
	@Autowired
	private IVerificationTokenRepository iverificationTokenRepository;
	

	
	
	private Date expirationAt() {
		
		return new Date(System.currentTimeMillis() + verificationTokenExpirationAt);
	}


	@Override
	public Optional<VerificationTokenEntity> findOneByCodeAndEmail(String code, String email) {
		
		return iverificationTokenRepository.findOneByCodeAndEmail(code, email);
	}


	@Override
	@Transactional
	public Boolean delete(String email) {	
		
		try {
			
			iverificationTokenRepository
			 .findAllByEmail(email)
			  .stream()
			   .forEach(entity -> {
				   iverificationTokenRepository
				    .delete(entity);
			   });
			
			return true;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return false;
		}
		
	
	}


	@Override
	public Boolean existsByEmail(String email) {
		return iverificationTokenRepository
				.existsByEmail(email);
	}


	@Override
	public VerificationTokenEntity findOneByEmail(String email) {
		return iverificationTokenRepository
				.findOneByEmail(email)
				.orElseThrow(()->new EntityNotFoundException("code"));
	}


	@Override
	public long countByEmail(String email) {
		return iverificationTokenRepository
				.countByEmail(email);
	}


	@Override
	@Transactional
	public Optional<VerificationTokenEntity> save(VerificationTokenEntity entity) {
		
		
		entity.setExpirationAt(expirationAt());
		
		return Optional
				.ofNullable(
				  iverificationTokenRepository
				   .save(entity)
				);  
	}
	
}
