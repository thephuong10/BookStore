package com.bookServer.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.bookServer.dto.AdminDTO;
import com.bookServer.dto.CustomerDTO;
import com.bookServer.dto.UserDTO;
import com.bookServer.entity.AdminEntity;
import com.bookServer.entity.CustomerEntity;
import com.bookServer.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface IUserConverter {
	
	UserDTO toDTO(UserEntity entity);
	
	@Mappings({
		@Mapping(target = "user.password",ignore = true)
	})
	AdminDTO toAdminDTO(AdminEntity entity);
	
	@Mappings({
		@Mapping(target = "carts",ignore = true),
		@Mapping(target = "user.password",ignore = true)
	})
	CustomerDTO toCustomerDTO(CustomerEntity entity);
	
}
