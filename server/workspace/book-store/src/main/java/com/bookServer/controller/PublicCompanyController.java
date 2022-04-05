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
import com.bookServer.entity.PublicCompanyEntity;
import com.bookServer.service.IPublicCompanyService;
import com.bookServer.utils.FuncitionUtils;

@RestController
public class PublicCompanyController {
	
	@Autowired
	private IPublicCompanyService iPublicCompanyService;
	
	@PostMapping("/auth/api/publicCompany")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> save(@RequestParam(name = "name") String name) {
		
		try {
			
			PublicCompanyEntity publicCompany = new PublicCompanyEntity();
			
			publicCompany.setName(name);
			publicCompany.setSlug(FuncitionUtils.generateSlug(publicCompany.getName()));
			
			
			return ResponseEntity.ok(iPublicCompanyService.saveOrUpdate(publicCompany));
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return ResponseEntity.status(500).body("Lỗi rồi");
		}
		
		
	}
	
	@PutMapping("/auth/api/publicCompany")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> update(@RequestBody PublicCompanyEntity payload
			
			) {
		
		
		try {
			
			PublicCompanyEntity publicCompany = iPublicCompanyService.getOneById(payload.getId());
			
			
			publicCompany.setName(payload.getName());
			publicCompany.setSlug(FuncitionUtils.generateSlug(publicCompany.getName()));
			
			
			return ResponseEntity.ok(iPublicCompanyService.saveOrUpdate(publicCompany));
			
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return ResponseEntity
					.status(500)
					.body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
		
		

	}
	
	@DeleteMapping("/auth/api/publicCompany/{id}")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
		
		
		try {
			
			PublicCompanyEntity publicCompany = iPublicCompanyService.getOneById(id);
			
			if(publicCompany.getBooks() != null && publicCompany.getBooks().size() > 0) {
				
			
				
				return ResponseEntity
						.status(400)
						.body(Collections.singletonMap("message", "Không thể xóa vì thực thể này liên quan tới nhiều thực thể khác"));
			}
			
			
			if(iPublicCompanyService.removeById(id)) {
				
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
	
	@GetMapping("/api/publicCompany/get/all")
	public ResponseEntity<?> getAll(){
		
		return ResponseEntity.ok(iPublicCompanyService.getAll(false));
		
	}
}

