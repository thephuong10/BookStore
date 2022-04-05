package com.bookServer.service;

import java.util.List;

import com.bookServer.dto.ReviewsDTO;
import com.bookServer.entity.ReviewsEntity;
import com.bookServer.model.Filter;
import com.bookServer.payload.PageableRequest;

public interface IReviewsService {

	List<ReviewsDTO>getAll(PageableRequest payload,boolean confirm);
	
	Long count(List<Filter>filters,boolean confirm);
	
	
	ReviewsEntity findAllById(Long id);
	
	Boolean save(ReviewsEntity entity,Long customerId);
	
	Boolean update(Long id,String status);
	
	Boolean removes(List<Long>ids);
	
	
}
