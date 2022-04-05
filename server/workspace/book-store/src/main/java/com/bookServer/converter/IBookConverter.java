package com.bookServer.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.bookServer.dto.BookDTO;
import com.bookServer.entity.BookEntity;

@Mapper(componentModel = "spring",
nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface IBookConverter {
	@Mappings({
		@Mapping(target = "rating", ignore = true),
	})
	BookEntity toEntity(BookDTO dto);

	@Mappings({ 
		@Mapping(target = "categories", ignore = true),
		@Mapping(target = "rating", ignore = true),
		@Mapping(target = "author.books", ignore = true),
		@Mapping(target = "author.admin", ignore = true),
		@Mapping(target = "publicCompany.books", ignore = true),
		@Mapping(target = "publicCompany.admin", ignore = true), 
		@Mapping(target = "admin.user", ignore = true)
		})
	BookDTO toDTO(BookEntity entity);
	
	@Mappings({ 
		@Mapping(target = "categories", ignore = true),
		@Mapping(target = "rating", ignore = true),
		@Mapping(target = "author.books", ignore = true),
		@Mapping(target = "author.admin", ignore = true),
		@Mapping(target = "publicCompany.books", ignore = true),
		@Mapping(target = "publicCompany.admin", ignore = true), 
		@Mapping(target = "description", ignore = true),
		@Mapping(target = "admin", ignore = true),
		})
	BookDTO toDTOs(BookEntity entity);
	
	
	
	
	
}
