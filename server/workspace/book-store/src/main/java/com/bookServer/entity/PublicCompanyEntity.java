package com.bookServer.entity;


import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.LastModifiedDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bookshop_public_company")
@Getter
@Setter
@NoArgsConstructor
public class PublicCompanyEntity extends BaseEntity {
	
	@OneToMany
	@JoinColumn(name = "public_company_id")
	private List<BookEntity>books;
	
	@LastModifiedDate
	private Date modifiedDate;
	
	@OneToOne
	@JoinColumn(name = "admin_id")
	private AdminEntity admin;
	
	private Long modifiedBy;
}
