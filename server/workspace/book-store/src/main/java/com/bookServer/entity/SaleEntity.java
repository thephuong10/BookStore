package com.bookServer.entity;


import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bookshop_sale")
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class SaleEntity extends BaseEntity {
	
	private Double discount;
	
	@OneToMany
	@JoinColumn(name = "sale_id")
	private List<BookEntity>books;
	
	private String banner;
	
	@LastModifiedDate
	private Date modifiedDate;
	
	@OneToOne
	@JoinColumn(name = "admin_id")
	private AdminEntity admin;
	
	private Long modifiedBy;
	
	private Timestamp startTime;
	
	private Timestamp endTime;

}
