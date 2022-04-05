package com.bookServer.dto;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDTO extends BaseDTO {
	
	private List<BookDTO>books;
	
	private Date modifiedDate;
	
	private Long modifiedBy;
	
	private AdminDTO admin;
}
