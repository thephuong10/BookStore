package com.bookServer.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookServer.converter.IAuthorConverter;
import com.bookServer.converter.IBookConverter;
import com.bookServer.dto.AuthorDTO;
import com.bookServer.entity.AuthorEntity;
import com.bookServer.exception.SaveFailedException;
import com.bookServer.repository.IAuthorRepository;
import com.bookServer.service.IAuthorService;

@Service
public class AuthorService implements IAuthorService {

	@Autowired
	private IAuthorRepository iAuthorRepository;

	@Autowired
	private IAuthorConverter converter;

	@Autowired
	private IBookConverter iBookConverter;

	@Override
	public List<AuthorDTO> getAll(boolean getBooks) {

		return iAuthorRepository.findAll().stream().map(a -> convertDetailAuthor(a, getBooks))
				.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public AuthorDTO saveOrUpdate(AuthorEntity payload) {

		return Optional.ofNullable(iAuthorRepository.save(payload)).map(a -> converter.toDTO(a))
				.orElseThrow(() -> new SaveFailedException("Author"));
	}

	private AuthorDTO convertDetailAuthor(AuthorEntity aEntity, boolean getBooks) {

		AuthorDTO author = converter.toDTO(aEntity);

		if (getBooks) {

			author.setBooks(
					aEntity.getBooks().stream().map(b -> iBookConverter.toDTOs(b)).collect(Collectors.toList()));
		}

		return author;
	}

	@Override
	public AuthorEntity getOneById(Long id) {

		return iAuthorRepository.findById(id).get();
	}

	@Override
	public Boolean removeById(Long id) {
		try {

			iAuthorRepository.deleteById(id);

			return true;

		} catch (Exception e) {

			return false;
		}
	}

}
