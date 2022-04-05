package com.bookServer.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.bookServer.dto.CategoryDTO;
import com.bookServer.entity.CategoryEntity;

@Mapper(componentModel = "spring")
public interface ICategoryConverter {
	
	@Mappings({
		@Mapping(target = "books",ignore = true),
		@Mapping(target = "admin.user",ignore = true)
	})
	CategoryDTO toDTO(CategoryEntity entity);
	
	@Mappings({
		@Mapping(target = "books",ignore = true),
		@Mapping(target = "admin",ignore = true)
	})
	CategoryDTO toDTOs(CategoryEntity entity);
	
}
