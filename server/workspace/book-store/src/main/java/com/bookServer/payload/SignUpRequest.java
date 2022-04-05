package com.bookServer.payload;

import java.io.Serializable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequest implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@NotBlank(message = "email is mandatory")
	@Email(message = "Invalid email format")
	private String email;
	
	@Size(min = 2,max = 20, message = "Minimum 2 characters, maximum 20 characters !")
	@NotBlank(message = "fullname is mandatory")
	private String fullname;
	
	@Size(min = 6,max = 15,message = "Minimum 6 characters, maximum 15 characters !")
	@NotBlank(message = "password is mandatory")
	private String password;
	

	
}
