package com.bookServer.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bookshop_address")
@Getter
@Setter
@NoArgsConstructor
public class AddressEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String provinceName;
	
	private String districtName;
	
	private String wardName;
	
	private Integer provinceId;
	
	private Integer districtId;
	
	private String wardCode;
	
	private String addressDetail;
	
}
