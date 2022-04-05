package com.bookServer.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookServer.constant.MessageConstant;
import com.bookServer.payload.PageableRequest;
import com.bookServer.service.IOrderService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class OrderController {

	@Autowired
	private IOrderService iOrderService;
	
	@Autowired
	private ObjectMapper mapper;
	
	
	@GetMapping("/api/order/get/all")
	public ResponseEntity<?> getAll(@RequestParam(name = "pageable") String json) {

		try {

			PageableRequest payload = mapper.readValue(json, PageableRequest.class).compact();
			
			//PageableRequest payload = pageable.compact();

			if (payload.getFilters() != null && payload.getFilters().size() > 0) {

				payload.getPaging()
				.updateTotalItem(iOrderService.count(payload.getFilters()));

			} else {

				payload.getPaging().updateTotalItem(iOrderService.count());
			}

			payload.setData(iOrderService.getAll(payload));

			return ResponseEntity.status(200).body(payload);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/api/order/get/detail/{id}")
	public ResponseEntity<?> getOrderDetail(@PathVariable(name = "id") Long id) {

		try {

			return ResponseEntity.status(200).body(iOrderService.getOneById(id));

		} catch (Exception e) {
			
			return ResponseEntity
					.status(400)
					.body(Collections.singletonMap("message", e.getMessage()));
		}
	}
	
	
	@PatchMapping("/auth/api/order")
	@PreAuthorize("hasAnyRole('ADMIN_ORDER','ADMIN_FULL')")
	public ResponseEntity<?> updateStatus(@RequestParam(name = "id") Long id,
			@RequestParam(name = "status") String status) {

		try {

			return ResponseEntity.status(200).body(iOrderService.updateStatusById(id,status));

		} catch (Exception e) {
			
			return ResponseEntity
					.status(400)
					.body(Collections.singletonMap("message", e.getMessage()));
		}
	}
	
	
	
	@DeleteMapping("/api/order")
	@PreAuthorize("hasAnyRole('ADMIN_ORDER','ADMIN_FULL')")
	public ResponseEntity<?> delete(@RequestBody List<Long> ids) {

		try {
			
			
			if(iOrderService.removes(ids)) {
				
				return ResponseEntity.ok(MessageConstant.Response.SC_OK);
				
			}

			return ResponseEntity.status(400).body(Collections.singletonMap("message", MessageConstant.Response.SC_BAD));

		} catch (Exception e) {
			
			return ResponseEntity
					.status(400)
					.body(Collections.singletonMap("message", e.getMessage()));
		}
	}
}
