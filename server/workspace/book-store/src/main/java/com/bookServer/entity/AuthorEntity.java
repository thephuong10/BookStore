package com.bookServer.entity;




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
import lombok.ToString;

@Entity
@Table(name = "bookshop_author")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
public class AuthorEntity extends BaseEntity {
		
	@OneToMany
	@JoinColumn(name = "author_id")
	private List<BookEntity>books;
	
	@LastModifiedDate
	private Date modifiedDate;
	
	@OneToOne
	@JoinColumn(name = "admin_id")
	private AdminEntity admin;
	
	private Long modifiedBy;
	
	

}
