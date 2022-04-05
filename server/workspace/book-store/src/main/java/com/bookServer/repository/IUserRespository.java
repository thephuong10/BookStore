package com.bookServer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookServer.entity.UserEntity;

public interface IUserRespository extends JpaRepository<UserEntity, Long>{
	
	
	Optional<UserEntity>findOneByEmail(String email);
	
	Boolean existsByEmail(String email);
	
	Boolean existsByEmailAndProvider(String email,String provider);
	
	Optional<UserEntity>findOneByEmailAndProvider(String email,String provider);
	
	
}
