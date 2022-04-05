package com.bookServer.service;

import java.util.List;

import com.bookServer.dto.AuthorDTO;
import com.bookServer.entity.AuthorEntity;

public interface IAuthorService {
	
	AuthorDTO saveOrUpdate(AuthorEntity payload);
	
	List<AuthorDTO>getAll(boolean getBooks);
	
	AuthorEntity getOneById(Long id);

	Boolean removeById(Long id);
}
