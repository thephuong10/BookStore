package com.bookServer.entity;


import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bookshop_order")
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class OrderEntity {
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long id;
	
	@Column(columnDefinition = "TEXT")
	private String reasonCancel;
	
	@Column(length = 50, columnDefinition = "varchar(50) default 'PENDING'")
	private String status;
	
	@CreatedDate
	private Date createDate;
	
	@LastModifiedDate
	private Date modifiedDate;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "bill_id")
	private List<OrderDetailEntity>orderDetail;
	
	private BigDecimal shippingCost;
	
	
	private BigDecimal totalMoney;
	
	@OneToOne
	@JoinColumn(name = "customer_id")
	private CustomerEntity customer;
	
}
