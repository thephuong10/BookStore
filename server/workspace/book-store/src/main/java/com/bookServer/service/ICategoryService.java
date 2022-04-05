package com.bookServer.service;

import java.util.List;

import com.bookServer.dto.CategoryDTO;
import com.bookServer.entity.CategoryEntity;

public interface ICategoryService {

	CategoryDTO saveOrUpdate(CategoryEntity payload);
	
	
	List<CategoryDTO>getAll(Boolean choose);
	
	CategoryEntity getOneById(Long id);
	
	Boolean removeById(Long id);
	
    Boolean existsByName(String name);
    
    String getNameBySlug(String slug);
	
}
