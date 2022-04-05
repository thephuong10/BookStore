package com.bookServer.service;

import java.math.BigDecimal;
import java.util.List;

import com.bookServer.dto.OrderDTO;
import com.bookServer.model.Filter;
import com.bookServer.payload.PageableRequest;

public interface IOrderService {

	Boolean create(Long customerId,BigDecimal feeShipping);
	
	List<OrderDTO>getAll(PageableRequest pageable);
	
	List<OrderDTO>getAllByCustomerId(Long CustomerId);
	
	OrderDTO getOneById(Long id);
	
	
	Long count();
	
	Long count(List<Filter>filters);
	
	Boolean updateStatusById(Long id,String status);
	
	Boolean cancelOrder(Long id,String note);
	
	Boolean removes(List<Long> ids);
}
