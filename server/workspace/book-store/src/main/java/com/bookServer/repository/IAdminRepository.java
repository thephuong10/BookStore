package com.bookServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookServer.entity.AdminEntity;

public interface IAdminRepository extends JpaRepository<AdminEntity, Long> {

	
	AdminEntity findByUserId(Long id);
}
