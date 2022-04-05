package com.bookServer.controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookServer.constant.MessageConstant;
import com.bookServer.entity.CategoryEntity;
import com.bookServer.service.ICategoryService;
import com.bookServer.utils.FuncitionUtils;

@RestController
public class CategoryController {
	
	@Autowired
	private ICategoryService iCategoryService;

	@GetMapping("/api/category/get/all")
	public ResponseEntity<?> getAll() {
		
		return ResponseEntity.ok(iCategoryService.getAll(false));
		
	}
	
	@GetMapping("/api/category/get/name/{slug}")
	public ResponseEntity<?> getName(@PathVariable(name = "slug") String slug) {
		
		return ResponseEntity.ok(iCategoryService.getNameBySlug(slug));
		
	}

	@PostMapping("/auth/api/category")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> save(
				@RequestParam(name = "name") String name
			) {
		
		
		try {
			
			CategoryEntity cEntity = new CategoryEntity();
			
			cEntity.setName(name);
			cEntity.setSlug(FuncitionUtils.generateSlug(cEntity.getName()));
			
			
			
			return ResponseEntity.ok(iCategoryService.saveOrUpdate(cEntity));
			
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return ResponseEntity
					.status(500)
					.body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
		
		

	}
	
	@PutMapping("/auth/api/category")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> update(@RequestBody CategoryEntity payload
			
			) {
		
		
		try {
			
			CategoryEntity cEntity = iCategoryService.getOneById(payload.getId());
			
			
			cEntity.setName(payload.getName());
			cEntity.setSlug(FuncitionUtils.generateSlug(cEntity.getName()));
			
			
			return ResponseEntity.ok(iCategoryService.saveOrUpdate(cEntity));
			
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return ResponseEntity
					.status(500)
					.body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
		
		

	}
	
	@DeleteMapping("/auth/api/category/{id}")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
		
		
		try {
			
			CategoryEntity cEntity = iCategoryService.getOneById(id);
			
			if(cEntity.getBooks() != null && cEntity.getBooks().size() > 0) {
				
			
				
				return ResponseEntity
						.status(400)
						.body(Collections.singletonMap("message", "Không thể xóa vì thực thể này liên quan tới nhiều thực thể khác"));
			}
			
			
			if(iCategoryService.removeById(id)) {
				
				return ResponseEntity
						.ok(MessageConstant.Response.SC_OK);
				
			} 
			
			return ResponseEntity
					.status(500)
					.body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
			
		} catch (Exception e) {
			e.printStackTrace();
			
			return ResponseEntity
					.status(500)
					.body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
		
		

	}

}
