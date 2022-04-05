package com.bookServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookServer.entity.CustomerEntity;

public interface ICustomerRepository extends JpaRepository<CustomerEntity, Long> {
	
	CustomerEntity findByUserId(Long id);
}
