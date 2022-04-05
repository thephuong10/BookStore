package com.bookServer.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpConfirmRequest {
	
	@NotBlank(message = "Không đưuọc bỏ trống !")
	@Email(message = "Email không hợp lệ !")
	private String email;
	
	@Size(min = 5,max = 5, message = "Phải đủ 5 kí tự !")
	@NotBlank(message = "Không đưuọc bỏ trống")
	private String code;
	
	@Size(min = 2,max = 50, message = "Từ 2 đến 50 ký tự !")
	@NotBlank(message = "Không đưuọc bỏ trống")
	private String fullname;
	
	
	@Size(min = 6,max = 20, message = "Từ 6 đến 20 ký tự !")
	@NotBlank(message = "Không đưuọc bỏ trống")
	private String password;
}
