package com.bookServer.service;

import java.util.List;

import com.bookServer.dto.PublicCompanyDTO;
import com.bookServer.entity.PublicCompanyEntity;

public interface IPublicCompanyService {
	
	PublicCompanyDTO saveOrUpdate(PublicCompanyEntity payload);
	
	List<PublicCompanyDTO> getAll(boolean getBooks);
	
	PublicCompanyEntity getOneById(Long id);
	
	Boolean removeById(Long id);
}
