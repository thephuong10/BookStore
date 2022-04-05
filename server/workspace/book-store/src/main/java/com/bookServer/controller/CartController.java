package com.bookServer.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookServer.constant.MessageConstant;
import com.bookServer.entity.BookEntity;
import com.bookServer.entity.CartEntity;
import com.bookServer.entity.CustomerEntity;
import com.bookServer.security.UserPrincipal;
import com.bookServer.service.IBookService;
import com.bookServer.service.ICartService;
import com.bookServer.utils.MapValueResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/auth/api/customer/carts")
public class CartController {
	
	@Autowired 
	private ICartService icartService;
	
	@Autowired
	private IBookService iBookService;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	
	@GetMapping
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<?> getAll(@AuthenticationPrincipal UserPrincipal user) {
		
		return ResponseEntity
				.ok(Collections.singletonMap("carts",
						 icartService.getAllByCustomerId(user.getUserDetailId())));
	
	}
	
	@PostMapping
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<?> add(@AuthenticationPrincipal UserPrincipal user,
			@RequestBody CartEntity payload) {
		
		CustomerEntity customer = new CustomerEntity();
		
		customer.setId(user.getUserDetailId());
		
		payload.setCustomer(customer);
		
		try {
			
			CartEntity cart = icartService
					.findOneByBookIdAndCustomerId(payload.getBook().getId(), 
							user.getUserDetailId());
			
			if(cart != null) {
				
				BookEntity book = iBookService.getById(payload.getBook().getId());
				
				if(book != null && (cart.getTotal() + payload.getTotal() <= book.getTotal())) {
					
					cart.setTotal(cart.getTotal() + payload.getTotal());
					
					icartService.save(cart);
					
				} else {
					
					return ResponseEntity
							.status(400)
							.body(Collections.singletonMap("message", "Số lượng hiện không đủ để cung cấp"));
				}
				
			} else {
				
				icartService.save(payload);
			}
			
			return ResponseEntity
					.ok(Collections.singletonMap("totalCart", 
							icartService.getTotalCartsByCustomerId(
									user.getUserDetailId())));
			 
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return ResponseEntity
					.status(500)
					.body(Collections.singletonMap("message", 
							MessageConstant.Response.SC_INTERNAL_SERVER_ERROR
							));
		}
		

		
	
	}
	
	@PutMapping
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<?> update(@AuthenticationPrincipal UserPrincipal user,
			@RequestBody List<CartEntity>carts) {
		
		List<Long>ids = new ArrayList<>();
		
		for (CartEntity c : carts) {
			
			CartEntity cart = icartService
					.findOneByBookIdAndCustomerId(c.getBook().getId(), 
							user.getUserDetailId());
			
			if(cart != null) {
				
				BookEntity book = iBookService.getById(c.getBook().getId());
				
				if((c.getTotal() <= book.getTotal()) && c.getTotal() > 0) {
					
					cart.setTotal(c.getTotal());
					
					icartService.save(cart);
					
				} else {
					
					ids.add(cart.getId());
					
				}
				
			}
			
		}
		
		
		return ResponseEntity
				.ok(MapValueResponse
					    .getInstance()
						.put("totalCart",icartService.getTotalCartsByCustomerId(
								user.getUserDetailId()))
						.put("cartsError",ids)
						.getAndReset());
		
	
	}
	
	@DeleteMapping
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<?> delete(@AuthenticationPrincipal UserPrincipal user
			,@RequestParam(name = "ids") String json) {
		
		
		List<Integer> ids;
		
		try {
			
			ids = objectMapper.readValue(json, ArrayList.class);
			
			List<Integer>successIds = new ArrayList<>();
			
			for (Integer id : ids) {
				
				if(icartService.delete((long)id)) {
					successIds.add(id);
				}
			}
			
			return ResponseEntity
					.ok(MapValueResponse
						    .getInstance()
							.put("totalCart",icartService.getTotalCartsByCustomerId(
									user.getUserDetailId()))
							.put("ids",successIds)
							.getAndReset());
			
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			return ResponseEntity
					.status(500)
					.body(Collections.singletonMap("message", 
							MessageConstant.Response.SC_INTERNAL_SERVER_ERROR
							));
		}
		
		
	
	}
	
}
