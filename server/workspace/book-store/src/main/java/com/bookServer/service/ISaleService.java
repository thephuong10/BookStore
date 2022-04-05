package com.bookServer.service;

import java.util.List;

import com.bookServer.dto.SaleDTO;
import com.bookServer.entity.SaleEntity;
import com.bookServer.model.Filter;
import com.bookServer.payload.PageableRequest;

public interface ISaleService {

	List<SaleDTO>getAll(PageableRequest payload);
	
	Long count();
	
	Long count(List<Filter>filters);
	
	SaleDTO getOneById(Long id);
	
	SaleEntity getById(Long id);
	
	SaleDTO saveOrUpdate(SaleEntity entity);

	boolean delete(List<Long>ids);
	
	String getNameBySlug(String slug);
}
