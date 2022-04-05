package com.bookServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookServer.entity.RatingEntity;

public interface IRatingRepository extends JpaRepository<RatingEntity,Long> {

	
	
}
