package com.bookServer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddressDTO {

	private String provinceName;
	
	private String districtName;
	
	private String wardName;
	
	private Integer provinceId;
	
	private Integer districtId;
	
	private String wardCode;
	
	private String addressDetail;
}
