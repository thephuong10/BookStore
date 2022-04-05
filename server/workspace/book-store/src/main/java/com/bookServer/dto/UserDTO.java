package com.bookServer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO  {
	
	private Long id;
	
	private String userType;
	
	
	private String email;
	
	private Boolean status;
	
	private String fullname;

	private String password;
	

	private String phone;

	
	private Long userDetailId;
	
	private AddressDTO address;
	
	
}
