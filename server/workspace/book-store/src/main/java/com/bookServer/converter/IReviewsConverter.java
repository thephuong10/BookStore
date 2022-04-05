package com.bookServer.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.bookServer.dto.ReviewsDTO;
import com.bookServer.entity.ReviewsEntity;

@Mapper(componentModel = "spring")
public interface IReviewsConverter {
	
	@Mappings({
		@Mapping(target = "user.carts",ignore = true),
		@Mapping(target = "user.user.password",ignore = true),
		@Mapping(target = "user.user.address",ignore = true),
		@Mapping(target = "book.categories", ignore = true),
		@Mapping(target = "book.rating", ignore = true),
		@Mapping(target = "book.author", ignore = true),
		@Mapping(target = "book.publicCompany", ignore = true),
		@Mapping(target = "book.description", ignore = true),
		@Mapping(target = "book.admin", ignore = true),
	})
	ReviewsDTO toDTO(ReviewsEntity entity);

}

