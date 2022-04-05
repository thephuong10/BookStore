package com.bookServer.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.bookServer.dto.AuthorDTO;
import com.bookServer.entity.AuthorEntity;

@Mapper(componentModel = "spring")
public interface IAuthorConverter {
	
	@Mappings({
		@Mapping(target = "books",ignore = true),
	})
	AuthorEntity toEntity(AuthorDTO dto);
	
	@Mappings({
		@Mapping(target = "books",ignore = true),
		@Mapping(target = "admin",ignore = true)
	})
	AuthorDTO toDTO(AuthorEntity entity);
	

	
}
