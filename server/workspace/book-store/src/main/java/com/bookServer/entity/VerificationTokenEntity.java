package com.bookServer.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(
	name = "bookshop_verification_token",
	uniqueConstraints = {
		@UniqueConstraint(columnNames = {"code","email"})
	 }
	)
@Getter
@Setter
@NoArgsConstructor
public class VerificationTokenEntity  {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String code;
	
	private Date expirationAt;
	
	private String email;
	
	
}
