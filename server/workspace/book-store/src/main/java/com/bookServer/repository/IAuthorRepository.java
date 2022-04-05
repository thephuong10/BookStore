package com.bookServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookServer.entity.AuthorEntity;


public interface IAuthorRepository extends JpaRepository<AuthorEntity, Long> {

	
	
}
