package com.bookServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookServer.entity.SaleEntity;

public interface ISaleRepository extends JpaRepository<SaleEntity, Long>,
											JpaSpecificationExecutor<SaleEntity> {

	@Query("SELECT s.name FROM SaleEntity s where s.slug = :slug")
	String findNameBySlug(@Param("slug") String slug);
	
	
}
