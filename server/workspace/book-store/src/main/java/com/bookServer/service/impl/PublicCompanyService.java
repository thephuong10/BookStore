package com.bookServer.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookServer.converter.IBookConverter;
import com.bookServer.converter.IPublicCompanyConverter;
import com.bookServer.dto.PublicCompanyDTO;
import com.bookServer.entity.PublicCompanyEntity;
import com.bookServer.exception.SaveFailedException;
import com.bookServer.repository.IPublicCompanyRepository;
import com.bookServer.service.IPublicCompanyService;

@Service
public class PublicCompanyService implements IPublicCompanyService {
	
	
	@Autowired
	private IPublicCompanyRepository iPublicCompanyRepository;
	
	@Autowired 
	private IPublicCompanyConverter iPublicCompanyConverter;
	
	@Autowired
	private IBookConverter iBookConverter;
	
	@Override
	public List<PublicCompanyDTO> getAll(boolean getBooks) {
		
		return iPublicCompanyRepository
				.findAll()
				 .stream()
				  .map(p->convertDetailAuthor(p,getBooks))
				  .collect(Collectors.toList());
	}

	@Override
	@Transactional
	public PublicCompanyDTO saveOrUpdate(PublicCompanyEntity payload) {
		
		
		return Optional
				.ofNullable(iPublicCompanyRepository.save(payload))
				.map(p-> iPublicCompanyConverter.toDTO(p))
				.orElseThrow(()-> new SaveFailedException("Author"));
	}

	private PublicCompanyDTO convertDetailAuthor(PublicCompanyEntity pEntity, boolean getBooks) {

		PublicCompanyDTO publicCompany = iPublicCompanyConverter.toDTO(pEntity);

		if (getBooks) {

			publicCompany.setBooks(
					pEntity.getBooks().stream().map(b -> iBookConverter.toDTOs(b)).collect(Collectors.toList()));
		}

		return publicCompany;
	}

	@Override
	public PublicCompanyEntity getOneById(Long id) {

		return iPublicCompanyRepository.findById(id).get();
	}

	@Override
	public Boolean removeById(Long id) {
		try {

			iPublicCompanyRepository.deleteById(id);

			return true;

		} catch (Exception e) {

			return false;
		}
	}
	
}
