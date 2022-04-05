package com.bookServer.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bookshop_role",uniqueConstraints = {@UniqueConstraint(columnNames = {"code"})})
@Getter
@Setter
@NoArgsConstructor
public class RoleEntity extends BaseEntity {
	
	private String code;
	
	@ManyToMany(fetch = FetchType.EAGER,mappedBy = "roles")
	private Set<UserEntity>users = new HashSet<>();
	
	
}
