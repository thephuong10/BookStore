package com.bookServer.dto;

import java.sql.Date;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReviewsDTO {

	
	private Long id;
	
	private String status;
	
	private String content;
	
	private Integer star;
	
	private List<String>images;
	
	private CustomerDTO user;
	
	
	private Date createDate;
	
	
	private Date modifiedDate;
	
	private BookDTO book;
}
