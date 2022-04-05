package com.bookServer.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrderDetailDTO {

	private Long id;
	
	private Integer total;
	
	private BigDecimal price;
	
	private Double discount;
	
	private BigDecimal totalMoney;
	
	private BookDTO book;
	
}
