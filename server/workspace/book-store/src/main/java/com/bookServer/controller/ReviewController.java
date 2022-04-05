package com.bookServer.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookServer.constant.MessageConstant;
import com.bookServer.entity.ReviewsEntity;
import com.bookServer.enums.ReviewsCaseEnum;
import com.bookServer.payload.PageableRequest;
import com.bookServer.security.UserPrincipal;
import com.bookServer.service.IReviewsService;
import com.bookServer.utils.HandleFile;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class ReviewController {

	@Autowired
	private ObjectMapper mapper;
	
	@Autowired
	private HandleFile handleFile;

//	@Autowired
//	private IBookService ibookService;

	@Autowired
	private IReviewsService iReviewsService;


	@PostMapping("/auth/api/reviews")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<?> create(@RequestParam(name = "entity") String json,
			@RequestParam(name = "files",required = false) List<MultipartFile> files,
			@AuthenticationPrincipal UserPrincipal user) {

		try {

			ReviewsEntity reviews = mapper.readValue(json, ReviewsEntity.class);
			
			addImages(files, reviews);
			
			reviews.setStatus(ReviewsCaseEnum.PENDING.toString());
			
			System.out.println(user.getUserDetailId());
			
			if(iReviewsService.save(reviews, user.getUserDetailId())) {
				
				return ResponseEntity.ok(MessageConstant.Response.SC_OK);
				
			}
			
			return ResponseEntity
					.status(400)
					.body(Collections.singletonMap("message", "Bạn đã từng đánh giá sản phẩm này"));
			

		} catch (Exception e) {

			e.printStackTrace();

			return ResponseEntity
					.status(500)
					.body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}

	}
	
	
	
	@GetMapping("/api/reviews/get/all")
	public ResponseEntity<?> getAll(@RequestParam(name = "pageable") String json) {

		try {

			PageableRequest payload = mapper.readValue(json, PageableRequest.class).compact();

			//PageableRequest payload = pageable.compact();
			
			if(payload.getPaging() != null) {
				
				if (payload.getFilters() != null && payload.getFilters().size() > 0) {

					payload.getPaging()
					.updateTotalItem(iReviewsService.count(payload.getFilters(),false));

				} else {

					payload.getPaging()
					.updateTotalItem(iReviewsService.count(new ArrayList<>(),false));
				}
				
			}

			payload.setData(iReviewsService.getAll(payload,false));

			return ResponseEntity.status(200).body(payload);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}

	}
	
	
	@PatchMapping("/auth/api/reviews")
	@PreAuthorize("hasAnyRole('ADMIN_REVIEWS','ADMIN_FULL')")
	public ResponseEntity<?> updateStatus(@RequestParam(name = "status") String status,
			@RequestParam(name = "id") Long id) {

		try {

			return ResponseEntity.ok(iReviewsService.update(id, status));

		} catch (Exception e) {

			e.printStackTrace();

			return ResponseEntity
					.status(500)
					.body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}

	}

	
	@DeleteMapping("/api/reviews")
	@PreAuthorize("hasAnyRole('ADMIN_REVIEWS','ADMIN_FULL')")
	public ResponseEntity<?> delete(@RequestBody List<Long> ids) {

		try {
			
			
			if(iReviewsService.removes(ids)) {
				
				return ResponseEntity.ok(MessageConstant.Response.SC_OK);
				
			}

			return ResponseEntity.status(400).body(Collections.singletonMap("message", MessageConstant.Response.SC_BAD));

		} catch (Exception e) {
			
			return ResponseEntity
					.status(400)
					.body(Collections.singletonMap("message", e.getMessage()));
		}
	}
	
	
	
	
	private boolean addImages(List<MultipartFile> files, ReviewsEntity reviews) {

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
					
					
					reviews.setImages(resultFile);


				}

			}

		} catch (IOException e) {

			e.printStackTrace();
		}

		return flag;
	}
}
