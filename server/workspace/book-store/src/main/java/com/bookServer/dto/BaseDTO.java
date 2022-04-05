package com.bookServer.dto;



import lombok.Setter;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class BaseDTO {
	
	private Long id;
	
	private String name;
	
	private String slug;
	
	
	private Date createDate;
	
}
