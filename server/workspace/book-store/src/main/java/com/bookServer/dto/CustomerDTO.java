package com.bookServer.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomerDTO {
	
	private Long id;
	
	private UserDTO user;
	
	private List<CartDTO>carts;
	
}
