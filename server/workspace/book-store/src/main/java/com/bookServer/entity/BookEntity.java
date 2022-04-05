package com.bookServer.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bookshop_book")
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class BookEntity extends BaseEntity {
	
	private BigDecimal priceOriginal;
	
	private BigDecimal price;
	
	private Double star;
		
	private Long total;
	
	private Long pages;
	
	private Integer width;
	
	private Integer height;
	
	private Double weight;
	
	private Long selled;
	
	@ElementCollection
	@JoinTable(name = "bookshop_book_images",joinColumns = @JoinColumn(name="book_id"))
	private List<String>images;
	
	@Column(columnDefinition = "TEXT")
	private String description;
	
	
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
		 name = "bookshop_category_book",
		 joinColumns = @JoinColumn(name="book_id"),
		 inverseJoinColumns = @JoinColumn(name="category_id")
	 )
	private List<CategoryEntity>categories;
	
	private Date publicYear;
	
	
	@OneToMany
	@JoinColumn(name = "book_id")
	private List<ReviewsEntity>reviews;
	
	@OneToOne
	@JoinColumn(name = "author_id")
	private AuthorEntity author;
	
	
	@OneToOne
	@JoinColumn(name = "public_company_id")
	private PublicCompanyEntity publicCompany;
	
	@OneToOne
	@JoinColumn(name = "sale_id")
	private SaleEntity sale;
	
	
	private String type;
	
	@LastModifiedDate
	private Date modifiedDate;
	
	@OneToOne
	@JoinColumn(name = "admin_id")
	private AdminEntity admin;
	
	private Long modifiedBy;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "rating_id")
	private RatingEntity rating;
}
