package com.bookServer.entity;



import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bookshop_reviews")
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)

public class ReviewsEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(columnDefinition = "TEXT")
	private String content;
	
	private Integer star;
	
	private String status;
	
	@OneToOne
	@JoinColumn(name = "user_id")
	private CustomerEntity user;
	
	@CreatedDate
	private Date createDate;
	
	@LastModifiedDate
	private Date modifiedDate;
	
	@ElementCollection
	@JoinTable(name = "bookshop_reviews_images",joinColumns = @JoinColumn(name="reviews_id"))
	private List<String>images;
	
	@OneToOne
	@JoinColumn(name = "book_id")
	private BookEntity book;

}
