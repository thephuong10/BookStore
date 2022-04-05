package com.bookServer.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CartDTO {

	private Long id;
	
	private BookDTO book;
	
	private Integer total;
	
	private BigDecimal totalMoney;
	
}
