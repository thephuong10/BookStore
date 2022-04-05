package com.bookServer.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
import org.springframework.web.multipart.MultipartFile;

import com.bookServer.constant.MessageConstant;
import com.bookServer.dto.SaleDTO;
import com.bookServer.entity.BaseEntity;
import com.bookServer.entity.BookEntity;
import com.bookServer.entity.SaleEntity;
import com.bookServer.payload.PageableRequest;
import com.bookServer.service.IBookService;
import com.bookServer.service.ISaleService;
import com.bookServer.utils.FuncitionUtils;
import com.bookServer.utils.HandleFile;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class SaleController {

	@Autowired
	private ISaleService iSaleService;

	@Autowired
	private HandleFile handleFile;

	@Autowired
	private IBookService ibookService;

	@Autowired
	private ObjectMapper mapper;
	
	@GetMapping("/api/sale/get/name/{slug}")
	public ResponseEntity<?> getName(@PathVariable(name = "slug") String slug) {
		
		return ResponseEntity.ok(iSaleService.getNameBySlug(slug));
		
	}

	@GetMapping("/api/sale/get/all")
	public ResponseEntity<?> getAll(@RequestParam(name = "pageable") String json) {

		try {

			PageableRequest payload = mapper.readValue(json, PageableRequest.class).compact();
			
			//PageableRequest payload = pageable.compact();

			if(payload.getPaging() != null) {
				
				if (payload.getFilters() != null && payload.getFilters().size() > 0) {

					payload.getPaging().updateTotalItem(iSaleService.count(payload.getFilters()));

				} else {

					payload.getPaging().updateTotalItem(iSaleService.count());
				}
				
			}

			payload.setData(iSaleService.getAll(payload));

			return ResponseEntity.status(200).body(payload);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/api/sale/get/{id}")
	public ResponseEntity<?> getById(@PathVariable(name = "id") Long id) {

		return ResponseEntity.ok(iSaleService.getOneById(id));

	}

	@PostMapping("/auth/api/sale")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> save(@RequestParam(name = "entity") String json,
			@RequestParam(name = "file") MultipartFile file) {

		try {

			SaleEntity sale = mapper.readValue(json, SaleEntity.class);

			String url = handleFile.upload(file.getBytes());

			sale.setBanner(url);

			if (sale.getBooks() != null) {

				List<BookEntity> books = new ArrayList<>();

				for (BookEntity book : sale.getBooks()) {

					System.out.println(book.getId());
					
					books.add(ibookService.getById(book.getId()));
				}
				
				sale.setBooks(books);
			}
			
			sale.setSlug(FuncitionUtils.generateSlug(sale.getName()));

			iSaleService.saveOrUpdate(sale);

			return ResponseEntity.ok(MessageConstant.Response.SC_OK);

		} catch (Exception e) {

			e.printStackTrace();

			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}

	}

	@PutMapping("/auth/api/sale")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> update(@RequestParam(name = "entity") String json,
			@RequestParam(name = "file", required = false) MultipartFile file

	) {

		try {

			SaleEntity payload = mapper.readValue(json, SaleEntity.class);

			SaleEntity entity = iSaleService.getById(payload.getId());

			if (file != null) {

				String url = handleFile.upload(file.getBytes());

				entity.setBanner(url);

			}

			if (payload.getBooks() != null) {

				List<BookEntity> books = new ArrayList<>();

				for (BookEntity book : payload.getBooks()) {

					books.add(ibookService.getById(book.getId()));
				}
				
				entity.setBooks(books);
			}
			
			entity.setSlug(FuncitionUtils.generateSlug(entity.getName()));

			return ResponseEntity.ok(iSaleService.saveOrUpdate(
					(SaleEntity) FuncitionUtils.mergeEntity(payload, entity, BaseEntity.class.getSimpleName())));

		} catch (Exception e) {

			e.printStackTrace();

			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}

	}
	
	@DeleteMapping("/auth/api/sale")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?>delete(@RequestBody List<SaleDTO>sales){
		
		
		Boolean success = iSaleService.delete(sales.stream()
				 .map(sale->sale.getId())
				 .collect(Collectors.toList()));
		
		if(!success) {
					
			return ResponseEntity
					.status(500)
					 .body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
			
		}
		
		for (SaleDTO sale : sales) {
			
			handleFile.delete(handleFile.getPublicId(sale.getBanner()));
		}
		
		return ResponseEntity.ok(MessageConstant.Response.SC_OK);
	}
}
