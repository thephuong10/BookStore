package com.bookServer.service.impl;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.bookServer.converter.IBookConverter;
import com.bookServer.converter.ICategoryConverter;
import com.bookServer.dto.BookDTO;
import com.bookServer.dto.RatingDTO;
import com.bookServer.dto.UserDTO;
import com.bookServer.entity.BookEntity;
import com.bookServer.entity.RatingEntity;
import com.bookServer.exception.EntityNotFoundException;
import com.bookServer.exception.SaveFailedException;
import com.bookServer.model.Filter;
import com.bookServer.payload.PageableRequest;
import com.bookServer.repository.IAdminRepository;
import com.bookServer.repository.IBookRepository;
import com.bookServer.repository.IRatingRepository;
import com.bookServer.repository.specification.GenericPredicate;
import com.bookServer.service.IBookService;
import com.bookServer.service.IUserService;
import com.bookServer.utils.FuncitionUtils;

@Service
public class BookService implements IBookService {

	@Autowired
	private IBookRepository iBookRepository;
	
	@Autowired
	private IRatingRepository iRatingRepository;

	@Autowired
	private IBookConverter iBookConverter;

	@Autowired
	private ICategoryConverter iCategoryConverter;
	
	@Autowired
	private IAdminRepository iAdminRespository;
	
	@Autowired
	private IUserService iUserService;

	@Override
	@Transactional
	public Boolean save(BookEntity entity,Long adminId) {

		entity.setSlug(FuncitionUtils.generateSlug(entity.getName()));
		entity.setSelled((long) 0);
		entity.setStar((double) 0);
		entity.setPrice(entity.getPriceOriginal());
		RatingEntity rating = new RatingEntity();
		
		rating.setRatingStar((double) 0);
		rating.setRatingList("0,0,0,0,0");
		
		entity.setRating(rating);
		
		entity.setAdmin(iAdminRespository.findById(adminId).get());
		

		return Optional.ofNullable(iBookRepository.save(entity)).map(value -> true)
				.orElseThrow(() -> new SaveFailedException("Book"));

	}

	@Override
	public List<BookDTO> getAll(PageableRequest payload) {

		Specification<BookEntity> specification = null;

		if (payload.getFilters() != null && payload.getFilters().size() > 0) {

			specification = Specification.where(new GenericPredicate<BookEntity>(payload.getFilters().get(0)));

			for (int i = 1; i < payload.getFilters().size(); i++) {

				specification = specification.and(new GenericPredicate<BookEntity>(payload.getFilters().get(i)));
			}
		}

		if (payload.getPaging() != null) {

			if (specification != null) {

				return convertListEntityToDTO(
						iBookRepository.findAll(specification, payload.createPagingAndSorter()).getContent());
			}

			return convertListEntityToDTO(iBookRepository.findAll(payload.createPagingAndSorter()).getContent());
		}

		return convertListEntityToDTO(iBookRepository.findAll());

	}

	@Override
	public List<BookDTO> getAll() {

		return convertListEntityToDTO(iBookRepository.findAll());
	}

	@Override
	public Long count() {

		return iBookRepository.count();
	}

	@Override
	public Long count(List<Filter> filters) {

		if (filters != null && filters.size() > 0) {

			Specification<BookEntity> specification = null;

			specification = Specification.where(new GenericPredicate<BookEntity>(filters.get(0)));

			for (int i = 1; i < filters.size(); i++) {

				specification = specification.and(new GenericPredicate<BookEntity>(filters.get(i)));
			}

			return iBookRepository.count(specification);

		}

		return iBookRepository.count();
	}


	private List<BookDTO> convertListEntityToDTO(List<BookEntity> books) {

		return books.stream().map(entity -> {

			BookDTO dto = iBookConverter.toDTOs(entity);
			

			setSale(dto, entity);
			setRating(dto, entity);
			
			
			setCategories(dto, entity);

			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public Boolean delete(List<Long> ids) {

		try {

			for (Long id : ids) {

				Long ratingId = iBookRepository.findById(id).get().getRating().getId();
				
				iBookRepository.deleteById(id);
				
				iRatingRepository.deleteById(ratingId);
			}

			return true;

		} catch (Exception e) {

			return null;
		}
	}

	public void setCategories(BookDTO dto, BookEntity entity) {

		dto.setCategories(
				entity.getCategories().stream().map(c -> iCategoryConverter.toDTOs(c)).collect(Collectors.toList()));

	}

	public void setRating(BookDTO dto, BookEntity entity) {

		RatingDTO rating = new RatingDTO();

		rating.setRatingStar(entity.getRating().getRatingStar());

		if (StringUtils.hasText(entity.getRating().getRatingList())) {

			rating.setRatingList(
					Arrays.asList(entity.getRating().getRatingList().split(","))
					.stream().map(n->Integer.parseInt(n)).collect(Collectors.toList())
					);

		}

		dto.setRating(rating);

	}

	private void setAdmin(BookDTO dto, BookEntity entity) {

		
		
		if(entity.getAdmin().getUser() == null) {
			
			dto.getAdmin().setUser(iUserService.findOneAdminById(entity.getAdmin().getId()).getUser());
			
			
		} else {
			
			UserDTO user = new UserDTO();
			
			user.setFullname(entity.getAdmin().getUser().getFullname());

			user.setId(entity.getAdmin().getUser().getId());
			
			dto.getAdmin().setUser(user);
		}
		
		

		

	}

	public void setSale(BookDTO dto, BookEntity entity) {
		

		if (entity.getSale() != null) {

			Date date = new Date(System.currentTimeMillis());
			

			if (date.compareTo(entity.getSale().getStartTime()) >= 0) {
				

				dto.setDiscount(entity.getSale().getDiscount());
				
				dto.setPrice(entity.getPrice());
				
				
				if(entity.getPrice().compareTo(entity.getPriceOriginal()) == 0) {
					
					dto.setPrice(
							(new BigDecimal((1 - (dto.getDiscount() / 100)))).multiply(entity.getPriceOriginal()));
					
					entity.setPrice(dto.getPrice());
					
					iBookRepository.save(entity);
					
				}
				

			}

			if (entity.getSale().getEndTime().compareTo(date) < 0) {

				
				dto.setPrice(dto.getPriceOriginal());
				dto.setDiscount((double) 0);

				entity.setSale(null);
				entity.setPrice(entity.getPriceOriginal());

				iBookRepository.save(entity);
			}

		} else {
			
			dto.setDiscount((double) 0);
			
		}

	}

	@Override
	public BookDTO getById(Long id, Boolean reviews) {

		return Optional.ofNullable(iBookRepository.findById(id).get())
				.map(entity -> convertBoookDetailEntityToDTO(entity))
				.orElseThrow(() -> new EntityNotFoundException("book with id " + id));
	}

	@Override
	public BookEntity getById(Long id) {

		return Optional.ofNullable(iBookRepository.findById(id).get()).map(entity -> entity)
				.orElseThrow(() -> new EntityNotFoundException("book with id " + id));
	}

	@Override
	public Object[] getMinAndMaxPriceByKey(String key,String value) {
		
		if(key.equals("c")) {
			
			return iBookRepository.findMinAndMaxPriceByCategories(value);
			
		} else if(key.equals("s")) {
			

			
			return iBookRepository.findMinAndMaxPriceBySale(value);
			
		} else if(key.equals("tn")) {
			

			
			return iBookRepository.findMinAndMaxPriceByTypeOrName(value,value.toUpperCase());
			
		} else {
			
			
			
			return iBookRepository.findMinAndMaxPrice();
		}

	}

	@Override
	public BookDTO convertBoookDetailEntityToDTO(BookEntity entity) {
		
		BookDTO dto = iBookConverter.toDTO(entity);

		setCategories(dto, entity);
		setRating(dto, entity);
		setSale(dto, entity);
		setAdmin(dto, entity);

		return dto;
		
	}

	@Override
	@Transactional
	public BookDTO update(BookEntity entity) {
		
		
		return Optional.ofNullable(iBookRepository.save(entity))
				.map(e -> convertBoookDetailEntityToDTO(e))
				.orElseThrow(() -> new SaveFailedException("Book"));
	}
}
