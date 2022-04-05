package com.bookServer.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.bookServer.dto.OrderDTO;
import com.bookServer.dto.OrderDetailDTO;
import com.bookServer.entity.OrderDetailEntity;
import com.bookServer.entity.OrderEntity;

@Mapper(componentModel = "spring")
public interface IOrderConverter {

	@Mappings({
		@Mapping(target = "orderDetail",ignore = true),
		@Mapping(target = "customer.carts",ignore = true)
	})
	OrderDTO toDTO(OrderEntity entity);
	
	@Mappings({ 
		@Mapping(target = "book", ignore = true),
		})                 
	OrderDetailDTO toOrderDetailDTO(OrderDetailEntity entity);
	
}
