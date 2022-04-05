package com.bookServer.service;

import java.util.List;

import com.bookServer.dto.CartDTO;
import com.bookServer.entity.CartEntity;

public interface ICartService {

	
	Boolean save(CartEntity entity);
	
	Integer getTotalCartsByCustomerId(Long customerId);
	
	List<CartDTO> getAllByCustomerId(Long customerId);
	
	CartEntity findOneByBookIdAndCustomerId(Long bookId,Long customerId);
	
	Boolean delete(Long id);
}
