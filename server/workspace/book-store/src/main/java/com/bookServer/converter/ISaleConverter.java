package com.bookServer.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.bookServer.dto.SaleDTO;
import com.bookServer.entity.SaleEntity;

@Mapper(componentModel = "spring")
public interface ISaleConverter {

	

	@Mappings({
		@Mapping(target = "admin.user",ignore = true),
		@Mapping(target = "books",ignore = true)
	})
	SaleDTO toDTOs(SaleEntity entity);
	
}
