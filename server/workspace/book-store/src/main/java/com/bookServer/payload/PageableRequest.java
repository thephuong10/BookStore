package com.bookServer.payload;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;

import com.bookServer.constant.RestConstant;
import com.bookServer.model.Filter;
import com.bookServer.model.Paging;
import com.bookServer.model.Sorter;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PageableRequest {
	
	Paging paging;
	
	String title;

	Sorter sorter;
	
	List<Filter>filters;
	
	List<?> data;
	
	public PageableRequest compact() {
		
		if(sorter != null) {
			
			if(StringUtils.hasText(sorter.getSortBy())) {
				
				if(!StringUtils.hasText(sorter.getSortBy())) {
					
					sorter.setOrderBy(RestConstant.Pageable.ORDER_BY_ASC);
				}
			} else {
				
				sorter = null;
			}
		}
		
		
		return this;
	}
	
	public Pageable createPagingAndSorter() {

		Pageable pageable = null;

		int offset = paging.getPage() - 1;

		int limit = paging.getLimit();

		if (sorter != null) {
			
			pageable = PageRequest.of(offset, limit, createSort());
			
		} else {
			pageable = PageRequest.of(offset, limit);
		}
		
		return pageable;
	}

	private Sort createSort() {
		
		Sort sort = Sort.by(sorter.getSortBy());

		if (sorter.getOrderBy().equals(RestConstant.Pageable.ORDER_BY_ASC)) {

			sort = sort.ascending();

		} else {

			sort = sort.descending();

		}

		return sort;

	}
}
