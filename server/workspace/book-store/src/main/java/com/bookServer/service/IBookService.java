package com.bookServer.service;

import java.util.List;

import com.bookServer.dto.BookDTO;
import com.bookServer.entity.BookEntity;
import com.bookServer.model.Filter;
import com.bookServer.payload.PageableRequest;

public interface IBookService {
	
	Boolean save(BookEntity entity,Long adminId);
	
	BookDTO update(BookEntity entity);
	
	Boolean delete(List<Long>ids);
	
	List<BookDTO>getAll();
	
	List<BookDTO>getAll(PageableRequest payload);
	
	Long count();
	
	Long count(List<Filter>filters);
	
	
	BookDTO getById(Long id,Boolean reviews);
	
	BookDTO convertBoookDetailEntityToDTO(BookEntity entity);
	
	BookEntity getById(Long id);
	
	Object[] getMinAndMaxPriceByKey(String key,String value);
}
