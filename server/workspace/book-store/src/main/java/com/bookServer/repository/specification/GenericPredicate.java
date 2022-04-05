package com.bookServer.repository.specification;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Comparator;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.bookServer.constant.FilterConstant;
import com.bookServer.model.Filter;

public class GenericPredicate<T> implements Specification<T> {
	
	
	private Filter filter;
	
	
    public GenericPredicate(Filter filter) {
    	
       this.filter = filter;
    }
	
	@Override
	public Predicate toPredicate(Root<T> root, 
								CriteriaQuery<?> query, 
								CriteriaBuilder builder) {
		
		switch (filter.getType()) {
			case FilterConstant.EQUAL:
	
				return builder.equal(root.get(filter.getKey()), filter.getValue());
				
			case FilterConstant.EQUAL_ID:
				
				return builder.equal(root.get(filter.getKey()), 
						Long.parseLong(filter.getValue()));
			
			case FilterConstant.LESS_THAN:
				
				return builder
						.lessThan(root.get(filter.getKey()), new BigDecimal(filter.getValue()));
				
			case FilterConstant.GREATER_THAN:
				
				return builder
						.greaterThan(root.get(filter.getKey()), new BigDecimal(filter.getValue()));
				
			case FilterConstant.BETWEEN:
				
				String [] split = filter.getValue().toString().split(",");
				
				if(split.length == 2 ) {
					
					BigDecimal [] numbers = new BigDecimal[2];
					
					for (int i = 0;i < split.length; i++) {
						
						try {
							
							numbers[i] = new BigDecimal(split[i]);
							
						} catch (NumberFormatException e) {
							
							numbers[i] = new BigDecimal(0);
						}
					}
					
					Arrays.sort(numbers,new Comparator<BigDecimal>() {

						@Override
						public int compare(BigDecimal o1, BigDecimal o2) {

							return o1.compareTo(o2);
							
						}
						
					});
					
					return builder.between(root.get(filter.getKey()), numbers[0], 
							numbers[1]);
				}
				
				return null;	
				
			case FilterConstant.LESS_THAN_OR_EQUAL_TO:
						
				return builder
						.lessThanOrEqualTo(root.get(filter.getKey()), new BigDecimal(filter.getValue()));
			
			case FilterConstant.GREATER_THAN_OR_EQUAL_TO:
				
				return builder
						.greaterThanOrEqualTo(root.get(filter.getKey()), new BigDecimal(filter.getValue()));

			case FilterConstant.STARTING_WITH:
				
				return builder
						.like(builder.upper(root.get(filter.getKey())),
								filter.getValue().toUpperCase()+"%");
						
			case FilterConstant.ENDING_WITH:
				
				return builder
						.like(builder.upper(root.get(filter.getKey())),
						"%"+filter.getValue().toUpperCase());
				
			case FilterConstant.CONTAINING:
				
				return builder
						.like(builder.upper(root.get(filter.getKey())),
								"%"+filter.getValue().toUpperCase()+"%");
				
			case FilterConstant.JOIN_ID:
				
				Join<Object, Object>joinID = root.join(filter.getKey());
				
				
				return builder
						.equal(joinID.get("id").as(Long.TYPE), 
								new Long(filter.getValue()));
				
			case FilterConstant.JOIN:
				
				Join<Object, Object>join = root.join(filter.getKey());
				
				
				return builder
						.equal(join.get(filter.getAttr()), 
								filter.getValue());
			
			default:
				
				return null;
		}
	}

}
