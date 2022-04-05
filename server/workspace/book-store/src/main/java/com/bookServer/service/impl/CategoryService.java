package com.bookServer.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookServer.converter.IBookConverter;
import com.bookServer.converter.ICategoryConverter;
import com.bookServer.dto.CategoryDTO;
import com.bookServer.entity.CategoryEntity;
import com.bookServer.exception.SaveFailedException;
import com.bookServer.repository.ICategoryRepository;
import com.bookServer.service.ICategoryService;

@Service
public class CategoryService implements ICategoryService {
	

	@Autowired
	private ICategoryRepository repository;
	
	@Autowired 
	private ICategoryConverter converter;
	
	@Autowired
	private IBookConverter iBookConverter;

	@Override
	@Transactional
	public CategoryDTO saveOrUpdate(CategoryEntity payload) {
		
		
		return Optional
				.ofNullable(repository.save(payload))
				.map(c->converter.toDTOs(c))
				.orElseThrow(()-> new SaveFailedException("category"));
	}

	@Override
	public List<CategoryDTO> getAll(Boolean getBooks) {

		return repository
				.findAll()
				 .stream()
				  .map(c -> convertDetailCategory(c,getBooks))
				  .collect(Collectors.toList());
	}

	

	@Override
	public CategoryEntity getOneById(Long id) {
		
		return repository.findById(id).get();
		
	}

	private CategoryDTO convertDetailCategory(CategoryEntity cEntity,boolean getBooks) {
		
		
		CategoryDTO category = converter.toDTOs(cEntity);
		  
		  if(getBooks) {
			  
			  category
			   .setBooks(
				cEntity.getBooks()
				 .stream()
				  .map(b->iBookConverter.toDTOs(b))
				  .collect(Collectors.toList())
				);
		  }
		  
		  
		  
		  return category;
	}

	@Override
	@Transactional
	public Boolean removeById(Long id) {
		
		try {
			
			repository.deleteById(id);
			
			return true;
			
		} catch (Exception e) {
			
			return false;
		}
	}

	@Override
	public Boolean existsByName(String name) {
		
		return repository.existsByName(name);
		
	}

	@Override
	public String getNameBySlug(String slug) {
		
		return repository.findNameBySlug(slug);
	}

}
