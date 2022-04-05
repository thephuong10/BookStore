package com.bookServer.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookServer.constant.FilterConstant;
import com.bookServer.converter.IReviewsConverter;
import com.bookServer.dto.ReviewsDTO;
import com.bookServer.entity.BookEntity;
import com.bookServer.entity.RatingEntity;
import com.bookServer.entity.ReviewsEntity;
import com.bookServer.enums.ReviewsCaseEnum;
import com.bookServer.exception.SaveFailedException;
import com.bookServer.model.Filter;
import com.bookServer.payload.PageableRequest;
import com.bookServer.repository.IBookRepository;
import com.bookServer.repository.ICustomerRepository;
import com.bookServer.repository.IRatingRepository;
import com.bookServer.repository.IReviewsRepository;
import com.bookServer.repository.specification.GenericPredicate;
import com.bookServer.service.IReviewsService;
import com.bookServer.utils.HandleFile;

@Service
public class ReviewsService implements IReviewsService {

	@Autowired
	private IReviewsRepository iReviewsRepository;
	
	@Autowired
	private IRatingRepository iRatingRepository;

	@Autowired
	private IBookRepository iBookRepository;
	
	@Autowired
	private ICustomerRepository iCustomerRepository;

	@Autowired
	private IReviewsConverter iReviewsConverter;
	
	@Autowired
	private HandleFile handleFile;

	@Override
	public List<ReviewsDTO> getAll(PageableRequest payload,boolean confirm) {

		Specification<ReviewsEntity> specification = null;

		if (payload.getFilters() != null && payload.getFilters().size() > 0) {

			specification = Specification.where(new GenericPredicate<ReviewsEntity>(payload.getFilters().get(0)));

			for (int i = 1; i < payload.getFilters().size(); i++) {

				specification = specification.and(new GenericPredicate<ReviewsEntity>(payload.getFilters().get(i)));
			}
		}
		
		if(confirm) {
			
			Filter filter = new Filter();
			
			filter.setKey("status");
			filter.setValue(ReviewsCaseEnum.CONFIRMED.toString());
			filter.setType(FilterConstant.EQUAL);
			
			if(specification != null) {
				
				specification = specification.and(new GenericPredicate<ReviewsEntity>(filter));
				
			} else {
				
				specification = Specification.where(new GenericPredicate<ReviewsEntity>(filter));
			}
		}

		if (payload.getPaging() != null) {

			if (specification != null) {

				return convertListEntityToDTO(
						iReviewsRepository.findAll(specification, payload.createPagingAndSorter()).getContent());

			}

			return convertListEntityToDTO(iReviewsRepository.findAll(payload.createPagingAndSorter()).getContent());
		}

		return convertListEntityToDTO(iReviewsRepository.findAll());

	}

	private List<ReviewsDTO> convertListEntityToDTO(List<ReviewsEntity> reviews) {

		return reviews
				.stream()
				.map(r -> iReviewsConverter.toDTO(r))
				.collect(Collectors.toList());
	}

	@Override
	public Long count(List<Filter> filters, boolean confirm) {
		
		Specification<ReviewsEntity> specification = null;
		
		if (filters != null && filters.size() > 0) {


			specification = Specification.where(new GenericPredicate<ReviewsEntity>(filters.get(0)));

			for (int i = 1; i < filters.size(); i++) {

				specification = specification.and(new GenericPredicate<ReviewsEntity>(filters.get(i)));
			}
			

		}
		
		if(confirm) {
			
			Filter filter = new Filter();
			
			filter.setKey("status");
			filter.setValue(ReviewsCaseEnum.CONFIRMED.toString());
			filter.setType(FilterConstant.EQUAL);
			
			if(specification != null) {
				
				specification = specification.and(new GenericPredicate<ReviewsEntity>(filter));
				
			} else {
				
				specification = Specification.where(new GenericPredicate<ReviewsEntity>(filter));
			}
		}
		

		return specification == null ? iReviewsRepository.count() : iReviewsRepository.count(specification);
	}



	
	@Override
	@Transactional
	public Boolean save(ReviewsEntity entity, Long customerId) {
		
		Optional<ReviewsEntity>optional = iReviewsRepository
				.findOneByBookIdAndCustomerId(entity.getBook().getId(), customerId);
		
		if(!optional.isPresent()) {
			BookEntity book = iBookRepository.findById(entity.getBook().getId()).get();
		
			entity.setBook(book);
			entity.setUser(iCustomerRepository.findById(customerId).get());
			entity.setStatus(ReviewsCaseEnum.PENDING.toString());
			
			return Optional
					.ofNullable(iReviewsRepository.save(entity))
					.map(a -> {
						
						RatingEntity rating = book.getRating();
						
						List<Integer>stars = new ArrayList<>(
								Arrays
								.asList(rating.getRatingList().split(","))
								.stream().map(s->Integer.parseInt(s))
								.collect(Collectors.toList()));
						
						stars.set(entity.getStar() -1, stars.get(entity.getStar() -1) + 1);
						
						String result = "";
						
						long ratingTotal = 0,ratingStar = 0;
						
						for (int j = 0; j < stars.size(); j++) {
							
							ratingStar += ((j+1)*stars.get(j));
							
							ratingTotal += stars.get(j);
							
							result = (j < stars.size() - 1) ? (result += (stars.get(j)+",")) : (result += (stars.get(j)));
							
						}
						
						rating.setRatingList(result);
						
						rating.setRatingStar(Math.round(((double)ratingStar/ratingTotal)*10.0)/10.0);
						
						
						iRatingRepository.save(rating);
						
						return true;
					})
					.orElseThrow(() -> new SaveFailedException("Reviews"));
			
			
		}
		
		
		return false;
		
	}

	@Override
	@Transactional
	public Boolean update(Long id, String status) {
		
		ReviewsEntity reviews =iReviewsRepository.findById(id).get();
		
		if(reviews != null) {
			
			List<ReviewsCaseEnum>reviewsCases = new ArrayList<>(Arrays.asList(ReviewsCaseEnum.values()));
			
			if(reviewsCases.stream()
					.filter(r->r.toString().equalsIgnoreCase(status)).count() > 0) {
				
				reviews.setStatus(status);
				
				return Optional
						.ofNullable(iReviewsRepository.save(reviews))
						.map(a -> true)
						.orElseThrow(() -> new SaveFailedException("Reviews"));
				
			}
			
			
			
		}
		
		
		return null;
		
	}
	
	@Override
	public ReviewsEntity findAllById(Long id) {
		
		return iReviewsRepository.findById(id).get();
	}

	@Override
	public Boolean removes(List<Long> ids) {
		try {
			
			
			boolean flag = true;
			
			for (Long id : ids) {
				
				ReviewsEntity reviewsEntity = iReviewsRepository.findById(id).get();
				
				if(reviewsEntity != null &&
						reviewsEntity.getStatus().equals(ReviewsCaseEnum.PENDING.toString())) {
					
					
					for (String img : reviewsEntity.getImages()) {
						
						handleFile.delete(handleFile.getPublicId(img));
					}
					
					iReviewsRepository.deleteById(id);
					
				} else {
					
					flag = false;
				}
				
			}
			
			return flag;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return false;
		}
	}



	
}
