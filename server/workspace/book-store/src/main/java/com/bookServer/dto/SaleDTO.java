package com.bookServer.dto;


import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SaleDTO extends BaseDTO {
	
	private String banner;
	
	private Double discount;

	private List<BookDTO>books;

	private Date modifiedDate;

	private Long modifiedBy;

	private Timestamp startTime;

	private Timestamp endTime;

	private AdminDTO admin;
}
