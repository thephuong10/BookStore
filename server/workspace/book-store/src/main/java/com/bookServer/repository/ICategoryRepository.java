package com.bookServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookServer.entity.CategoryEntity;

public interface ICategoryRepository extends JpaRepository<CategoryEntity, Long> {
	
	@Query("SELECT c.name FROM CategoryEntity c where c.slug = :slug")
	String findNameBySlug(@Param("slug") String slug);
	
	Boolean existsByName(String name);
	
}
