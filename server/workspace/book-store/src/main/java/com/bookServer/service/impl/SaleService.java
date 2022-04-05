package com.bookServer.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookServer.converter.ISaleConverter;
import com.bookServer.dto.BookDTO;
import com.bookServer.dto.SaleDTO;
import com.bookServer.entity.SaleEntity;
import com.bookServer.exception.SaveFailedException;
import com.bookServer.model.Filter;
import com.bookServer.payload.PageableRequest;
import com.bookServer.repository.ISaleRepository;
import com.bookServer.repository.specification.GenericPredicate;
import com.bookServer.service.ISaleService;

@Service
public class SaleService implements ISaleService {

	@Autowired	
	private ISaleRepository repository;
	

	
	
	
	@Autowired 
	private ISaleConverter converter;
	
	
	@Override
	public List<SaleDTO> getAll(PageableRequest payload) {
		Specification<SaleEntity> specification = null;

		if (payload.getFilters() != null && payload.getFilters().size() > 0) {

			specification = Specification.where(new GenericPredicate<SaleEntity>(payload.getFilters().get(0)));

			for (int i = 1; i < payload.getFilters().size(); i++) {

				specification = specification.and(new GenericPredicate<SaleEntity>(payload.getFilters().get(i)));
			}
		}

		if (payload.getPaging() != null) {

			if (specification != null) {

				return convertListEntityToDTO(
						repository.findAll(specification, payload.createPagingAndSorter()).getContent());
			}

			return convertListEntityToDTO(repository.findAll(payload.createPagingAndSorter()).getContent());
		}

		return convertListEntityToDTO(repository.findAll());
	}
	
	private List<SaleDTO> convertListEntityToDTO(List<SaleEntity> sales) {

		return sales
				.stream()
				.map(entity -> converter.toDTOs(entity))
				.collect(Collectors.toList());
	}

	@Override
	public Long count() {
		
		return repository.count();
		
	}

	@Override
	public Long count(List<Filter> filters) {
		
		if (filters != null && filters.size() > 0) {

			Specification<SaleEntity> specification = null;

			specification = Specification.where(new GenericPredicate<SaleEntity>(filters.get(0)));

			for (int i = 1; i < filters.size(); i++) {

				specification = specification.and(new GenericPredicate<SaleEntity>(filters.get(i)));
			}

			return repository.count(specification);

		}

		return repository.count();
	}

	@Override
	public SaleDTO getOneById(Long id) {
		
		return repository.findById(id).map(entity -> {

			SaleDTO dto = converter.toDTOs(entity);
			
			dto.setBooks(entity.getBooks().stream().map(b->{
				BookDTO bookDTO = new BookDTO();
				bookDTO.setId(b.getId());
				return bookDTO;
			}).collect(Collectors.toList()));
			
			return dto;
		}).get();
		
	}

	@Override
	@Transactional
	public SaleDTO saveOrUpdate(SaleEntity entity) {
		
		return Optional
				.ofNullable(repository.save(entity))
				.map(c -> {

					SaleDTO dto = converter.toDTOs(c);
					
					dto.setBooks(c.getBooks().stream().map(b->{
						BookDTO bookDTO = new BookDTO();
						bookDTO.setId(b.getId());
						return bookDTO;
					}).collect(Collectors.toList()));
					
					return dto;
				})
				.orElseThrow(()-> new SaveFailedException("Sale"));
	}

	@Override
	public SaleEntity getById(Long id) {
		// TODO Auto-generated method stub
		return repository.findById(id).get();
	}

	@Override
	@Transactional
	public boolean delete(List<Long> ids) {
		
		
		try {
			
			for (Long id : ids) {
				
				repository.deleteById(id);
				
			}
			
			return true;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return false;
		}
		
	}

	@Override
	public String getNameBySlug(String slug) {
		
		return repository.findNameBySlug(slug);
	}

}
