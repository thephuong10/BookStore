package com.bookServer.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookServer.constant.MessageConstant;
import com.bookServer.dto.AdminDTO;
import com.bookServer.dto.BookDTO;
import com.bookServer.entity.BaseEntity;
import com.bookServer.entity.BookEntity;
import com.bookServer.payload.PageableRequest;
import com.bookServer.security.UserPrincipal;
import com.bookServer.service.IBookService;
import com.bookServer.service.IUserService;
import com.bookServer.utils.FuncitionUtils;
import com.bookServer.utils.HandleFile;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class BookController {

	@Autowired
	private ObjectMapper mapper;
	
	@Autowired
	private HandleFile handleFile;

	@Autowired
	private IBookService ibookService;

	@Autowired
	private IUserService iuserService;


	@PostMapping("/auth/api/book")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> save(@RequestParam(name = "entity") String json,
			@RequestParam(name = "files") List<MultipartFile> files,
			@AuthenticationPrincipal UserPrincipal user) {

		try {

			BookEntity book = mapper.readValue(json, BookEntity.class);
			
			addImages(files, book);
			
			
			ibookService.save(book,user.getUserDetailId());

			return ResponseEntity.ok(MessageConstant.Response.SC_OK);

		} catch (Exception e) {

			e.printStackTrace();

			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}

	}

	@PutMapping("/auth/api/book")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> update(
			@RequestParam(name = "entity") String json,
			@RequestParam(name = "files",required = false) 
			List<MultipartFile> files

			){
		
		
		try {
			
			BookEntity payload = mapper.readValue(json, BookEntity.class);
			
			BookEntity entity = ibookService.getById(payload.getId());
			
			entity.setImages(updateImages(entity.getImages(), payload.getImages()));
			
			payload.setImages(null);
						
			addImages(files, entity);

			
			return ResponseEntity.ok(ibookService.update((BookEntity) FuncitionUtils
					.mergeEntity(payload,entity, 
							  BaseEntity.class.getSimpleName())));
		
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return ResponseEntity
					.status(500)
					 .body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
		
		
	}

	
	@PatchMapping("/auth/api/book")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?> updateType(
			@RequestParam(name = "id") Long id,
			@RequestParam(name = "type") String type){
		
		
		try {
			
			BookEntity entity = ibookService.getById(id);
			
			entity.setType(type);
			
			ibookService.update(entity);
			
			return ResponseEntity.ok(MessageConstant.Response.SC_OK);
		
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return ResponseEntity
					.status(500)
					 .body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
		
		
	}
	
	

	@DeleteMapping("/auth/api/book")
	@PreAuthorize("hasAnyRole('ADMIN_PRODUCT','ADMIN_FULL')")
	public ResponseEntity<?>delete(@RequestBody List<BookDTO>books){
		
		Boolean success = 		
				ibookService.delete(
						books.stream()
						 .map(book->book.getId())
						 .collect(Collectors.toList()));

		
		if(!success) {
					
			return ResponseEntity
					.status(500)
					 .body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
			
		}
		
		for (BookDTO book : books) {
			
			for (String img : book.getImages()) {
				
				handleFile.delete(handleFile.getPublicId(img));
				
			}
		}
		
		return ResponseEntity.ok(MessageConstant.Response.SC_OK);
	}

	@GetMapping("/api/book/get/all")
	public ResponseEntity<?> getAll(@RequestParam(name = "pageable") String json) {

		try {

			PageableRequest payload = mapper.readValue(json, PageableRequest.class).compact();

			//PageableRequest payload = pageable.compact();
			
			if(payload.getPaging() != null) {
				
				if (payload.getFilters() != null && payload.getFilters().size() > 0) {

					payload.getPaging().updateTotalItem(ibookService.count(payload.getFilters()));

				} else {

					payload.getPaging().updateTotalItem(ibookService.count());
				}
				
			}

			payload.setData(ibookService.getAll(payload));

			return ResponseEntity.status(200).body(payload);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}

	}


	@GetMapping("/api/book/get/{id}")
	public ResponseEntity<?> getById(@PathVariable(name = "id") Long id) {

		try {

			BookDTO book = ibookService.getById(id, true);

			Map result = mapper.convertValue(book, Map.class);

			if (book.getModifiedBy() != null) {

				AdminDTO admin = iuserService.findOneAdminById(book.getModifiedBy());

				result.put("modifiedBy", admin);

			}

			return ResponseEntity.ok(result);

		} catch (Exception e) {

			e.printStackTrace();

			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/api/book/get/min-max-price")
	public ResponseEntity<?> getMinMaxPrice(@RequestParam(name = "key") String key,
			@RequestParam(name = "value") String value) {

		System.out.println(key + " : " + value);
		
		try {

			return ResponseEntity.ok(ibookService.getMinAndMaxPriceByKey(key,value));

		} catch (Exception e) {

			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}

	}

//	@GetMapping("/api/book/get/reviews")
//	public ResponseEntity<?> getReviewsByBook(@RequestParam(name = "pageable") String json) {
//
//		try {
//
//			PageableRequest payload = mapper.readValue(json, PageableRequest.class).compact();
//
//			payload.getPaging().updateTotalItem(iReviewsService.count(payload.getFilters()));
//
//			payload.setData(iReviewsService.getAllByBookId(payload));
//
//			return ResponseEntity.status(200).body(payload);
//
//		} catch (JsonProcessingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
//		}
//
//	}

	private boolean addImages(List<MultipartFile> files, BookEntity book) {

		boolean flag = false;

		try {
			

			if (files != null && files.size() > 0) {

				List<String> resultFile = new ArrayList<>();

				for (MultipartFile file : files) {

					String url = handleFile.upload(file.getBytes());

					if (StringUtils.hasText(url)) {

						resultFile.add(url);

						flag = true;
					}

				}

				if (flag) {
					
					resultFile.stream().forEach(i->System.out.println(i));

					if(book.getImages() != null && book.getImages().size() > 0) {
						
						for (String img : resultFile) {
							
							book.getImages().add(img);
						}
						
					} else {
						
						book.setImages(resultFile);
						
					}

				}

			}

		} catch (IOException e) {

			e.printStackTrace();
		}

		return flag;
	}
	
	private List<String> updateImages(List<String> imgagesOld , List<String> imgagesNew) {

		
		List<String> bigArr = imgagesOld;
		List<String> smallArr = imgagesNew;
		
		
		if (imgagesOld.size() != imgagesNew.size()) {
			
			bigArr = imgagesOld.size() > imgagesNew.size() ? imgagesOld : imgagesNew;
			
			 
			smallArr = imgagesOld.size() < imgagesNew.size() ? imgagesOld : imgagesNew;
			 
		}
		
		List<Integer>flags=new ArrayList<>(Collections.nCopies(bigArr.size(), 0));
		
		List<String> result = new ArrayList<>();
		
		boolean flag = false;
		
		for (int i = 0; i < smallArr.size(); i++) {
			
			for (int j = 0; j < bigArr.size(); j++) {
				
				if(smallArr.get(i).equals(bigArr.get(j))) {
					
					flags.set(j, 1);
					
					flag = true ;
					
					break;
					
				}
				
			}
			
		}
		
		
		if(!flag) {
			
			// remove all images in old array 
			
			for (String img : imgagesOld) {
				
				 handleFile.delete(handleFile.getPublicId(img));
			}
			
			
		} else {
			
			for (int i = 0; i < bigArr.size() ; i++) {
				
				if(flags.get(i) == 0) {
					
				  handleFile.delete(handleFile.getPublicId(bigArr.get(i)));
					
				} else {
					
					result.add(bigArr.get(i));
					
				}
			}
			
		}
		
		return result;
		
	}
	
}
