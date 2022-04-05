package com.bookServer.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrderDTO {

	
	private Long id;
	
	
	private String reasonCancel;
	
	
	private String status;
	
	
	private Date createDate;
	
	
	private Date modifiedDate;
	
	
	private List<OrderDetailDTO>orderDetail;
	
	private BigDecimal shippingCost;
	
	
	private BigDecimal totalMoney;
	
	private CustomerDTO customer;
	
}
