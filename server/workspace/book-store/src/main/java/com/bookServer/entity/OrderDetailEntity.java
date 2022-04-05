package com.bookServer.entity;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bookshop_order_detail")
@Getter
@Setter
@NoArgsConstructor
public class OrderDetailEntity {

	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long id;
	
	private Integer total;
	
	private BigDecimal price;
	
	private Double discount;
	
	private BigDecimal totalMoney;
	
	@OneToOne
	@JoinColumn(name = "book_id")
	private BookEntity book;
	
	
	
}
