package com.bookServer.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.bookServer.dto.CartDTO;
import com.bookServer.entity.CartEntity;

@Mapper(componentModel = "spring")
public interface ICartConverter {

	@Mappings({
		@Mapping(target = "book",ignore = true)
	})
	CartDTO toDTO(CartEntity entity);
}
