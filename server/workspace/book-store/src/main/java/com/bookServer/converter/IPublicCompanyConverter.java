package com.bookServer.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.bookServer.dto.PublicCompanyDTO;
import com.bookServer.entity.PublicCompanyEntity;

@Mapper(componentModel = "spring")
public interface IPublicCompanyConverter {
	
	@Mappings({
		@Mapping(target = "books",ignore = true),
	})
	PublicCompanyEntity toEntity(PublicCompanyDTO dto);
	
	
	@Mappings({
		@Mapping(target = "books",ignore = true),
		@Mapping(target = "admin",ignore = true)
	})
	PublicCompanyDTO toDTO(PublicCompanyEntity entity);

//	default PublicCompanyDTO toDTO(PublicCompanyEntity entity) {
//
//		PublicCompanyDTO dto = new PublicCompanyDTO();
//
//		dto.setId(entity.getId());
//
//		dto.setModifiedBy(entity.getModifiedBy());
//
//		dto.setCreateDate(entity.getCreateDate());
//
//		dto.setName(entity.getName());
//
//		dto.setSlug(entity.getSlug());
//
////		dto.setBooks(entity.getBooks().stream().map(book->{
////			
////			BookDTO result = new BookDTO();
////			
////			
////			
////			return result;
////		}).collect(Collectors.toList()));
//
//		return dto;
//	}
}
