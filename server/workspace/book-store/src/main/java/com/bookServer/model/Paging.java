package com.bookServer.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class Paging {
	@NotBlank(message = "page is mandatory")
	@Size(min = 1, message = "At least 1!")
	private Integer page;

	private Integer limit;

	private Long totalPage;
	
	private Long totalItem;

	
	
	public void updateTotalItem(Long totalItem) {
		
		this.totalItem = totalItem;
		
		this.totalPage = (long)Math.ceil((double)this.totalItem/this.limit);
	}
}
