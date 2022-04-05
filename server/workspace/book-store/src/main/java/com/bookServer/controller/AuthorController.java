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
import com.bookServer.entity.AuthorEntity;
import com.bookServer.service.IAuthorService;
import com.bookServer.utils.FuncitionUtils;

@RestController
public class AuthorController {
	
	@Autowired
	private IAuthorService iAuthorService;
	
	@PostMapping("/auth/api/author")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> save(@RequestParam(name = "name") String name) {
		
		try {
			
			AuthorEntity author = new AuthorEntity();
			
			author.setName(name);
			author.setSlug(FuncitionUtils.generateSlug(author.getName()));
			
			
			return ResponseEntity.ok(iAuthorService.saveOrUpdate(author));
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return ResponseEntity.status(500).body("Lỗi rồi");
		}
		
		
	}
	
	@PutMapping("/auth/api/author")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> update(@RequestBody AuthorEntity payload
			
			) {
		
		
		try {
			
			AuthorEntity author = iAuthorService.getOneById(payload.getId());
			
			
			author.setName(payload.getName());
			author.setSlug(FuncitionUtils.generateSlug(author.getName()));
			
			
			return ResponseEntity.ok(iAuthorService.saveOrUpdate(author));
			
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return ResponseEntity
					.status(500)
					.body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
		
		

	}
	
	@DeleteMapping("/auth/api/author/{id}")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
		
		
		try {
			
			AuthorEntity author = iAuthorService.getOneById(id);
			
			if(author.getBooks() != null && author.getBooks().size() > 0) {
				
			
				
				return ResponseEntity
						.status(400)
						.body(Collections.singletonMap("message", "Không thể xóa vì thực thể này liên quan tới nhiều thực thể khác"));
			}
			
			
			if(iAuthorService.removeById(id)) {
				
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
	
	@GetMapping("/api/author/get/all")
	public ResponseEntity<?> getAll(){
		
		return ResponseEntity.ok(iAuthorService.getAll(false));
		
	}
}
