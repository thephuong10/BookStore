package com.bookServer.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookServer.converter.ICartConverter;
import com.bookServer.dto.CartDTO;
import com.bookServer.entity.CartEntity;
import com.bookServer.exception.SaveFailedException;
import com.bookServer.repository.ICartRepository;
import com.bookServer.service.IBookService;
import com.bookServer.service.ICartService;

@Service
public class CartService implements ICartService {

	@Autowired
	private ICartRepository iCartRepository;
	
	@Autowired
	private ICartConverter iCartConverter;
	
	@Autowired
	private IBookService iBookService;
	
	
	@Override
	@Transactional
	public Boolean save(CartEntity entity) {
		
		
		return Optional
				.ofNullable(iCartRepository.save(entity))
				.map(c->true)
				.orElseThrow(() -> new SaveFailedException("Cart"))
				;
		
	}




	@Override
	public Integer getTotalCartsByCustomerId(Long customerId) {
		
		return iCartRepository.getTotalCartsByCustomerId(customerId);
	}




	@Override
	public CartEntity findOneByBookIdAndCustomerId(Long bookId, Long customerId) {
		
		
		Optional<CartEntity>cart = iCartRepository
				.findOneByBookIdAndCustomerId(bookId, customerId);
		
		return cart.isPresent() ? cart.get() : null;
	}




	@Override
	@Transactional
	public Boolean delete(Long id) {
		
		
		try {
			
			iCartRepository.deleteById(id);
			
			return true;
			
		} catch (Exception e) {
			
			return false;
			
		
		}
	}




	@Override
	public List<CartDTO> getAllByCustomerId(Long customerId) {
		
		return iCartRepository
				.findAllByCustomerId(customerId)
				.stream()
				.map(entity -> {
					
					CartDTO cart = iCartConverter.toDTO(entity);
					
					cart.setBook(iBookService.convertBoookDetailEntityToDTO(entity.getBook()));
					
					return cart;
				}).collect(Collectors.toList());
		
	}

}
