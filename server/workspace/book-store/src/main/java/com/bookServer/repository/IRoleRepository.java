package com.bookServer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookServer.entity.RoleEntity;

public interface IRoleRepository extends JpaRepository<RoleEntity, Long> {

	Optional<RoleEntity>findOneByCode(String code);
	
}
