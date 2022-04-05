package com.bookServer.payload;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ShippingOrderResponse {

	
	private Integer code;
	
	private String message;
	
	private String code_message_value;
	
	private List<ShippingData>data;	
	
}
