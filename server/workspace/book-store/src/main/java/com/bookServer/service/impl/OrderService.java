package com.bookServer.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookServer.converter.IBookConverter;
import com.bookServer.converter.ICategoryConverter;
import com.bookServer.converter.IOrderConverter;
import com.bookServer.dto.BookDTO;
import com.bookServer.dto.OrderDTO;
import com.bookServer.dto.OrderDetailDTO;
import com.bookServer.entity.BookEntity;
import com.bookServer.entity.CartEntity;
import com.bookServer.entity.CustomerEntity;
import com.bookServer.entity.OrderDetailEntity;
import com.bookServer.entity.OrderEntity;
import com.bookServer.enums.OrderStatusEnum;
import com.bookServer.exception.EntityNotFoundException;
import com.bookServer.model.Filter;
import com.bookServer.payload.PageableRequest;
import com.bookServer.repository.IBookRepository;
import com.bookServer.repository.ICustomerRepository;
import com.bookServer.repository.IOrderRepository;
import com.bookServer.repository.specification.GenericPredicate;
import com.bookServer.service.IOrderService;

@Service
public class OrderService implements IOrderService {

	@Autowired
	private IOrderRepository iorrderRepository;
	
	@Autowired
	private IBookRepository iBookRepository;
	
	@Autowired
	private ICustomerRepository icustomerRepository;
	
	@Autowired
	private IOrderConverter iOrderConverter;
	
	@Autowired
	private IBookConverter iBookConverter;
	
	@Autowired
	private ICategoryConverter iCategoryConverter;


	@Override
	@Transactional
	public Boolean create(Long customerId, BigDecimal feeShipping) {

		OrderEntity order = new OrderEntity();
		
		CustomerEntity customer = icustomerRepository.findById(customerId).get();

		if(customer != null) {
			
			order.setCustomer(customer);
			order.setShippingCost(feeShipping);
			order.setStatus(OrderStatusEnum.PENDING.toString());
			
			order.setOrderDetail(createOrderDetailEntities(customer.getCarts()));
			order.setTotalMoney(order
					.getOrderDetail()
					.stream()
					.map(o->o.getTotalMoney())
					.reduce(new BigDecimal(0),(cur,acc)->cur.add(acc))
					);
			order.setTotalMoney(order.getTotalMoney().add(order.getShippingCost()));
			
			
			return Optional.ofNullable(iorrderRepository.save(order))
					.map(c->true)
					.orElseThrow(()-> new EntityNotFoundException("ORDER"));
			
		}
		
		return false;
	}
	
	private List<OrderDetailEntity> createOrderDetailEntities(List<CartEntity>carts) {
		
		List<OrderDetailEntity>orderDetailEntities = new ArrayList<>();

		for (CartEntity cart : carts) {

			OrderDetailEntity orderDetail = new OrderDetailEntity();

			BookEntity book = cart.getBook();

			orderDetail.setTotal(cart.getTotal());

			orderDetail.setBook(book);
			
			orderDetail.setPrice(book.getPriceOriginal());

			if (book.getSale() != null) {

				Date date = new Date(System.currentTimeMillis());

				if (date.compareTo(book.getSale().getStartTime()) >= 0
						&& date.compareTo(book.getSale().getEndTime()) <= 0) {

					orderDetail.setDiscount(book.getSale().getDiscount());
					
					orderDetail.setPrice(
							(new BigDecimal((1 - (orderDetail.getDiscount() / 100)))).multiply(orderDetail.getPrice()));
					
				}

			}
			
			orderDetail
			 .setTotalMoney(orderDetail
					 .getPrice()
					 .multiply(new BigDecimal(orderDetail.getTotal())));
			
			
			orderDetailEntities.add(orderDetail);

			BookEntity bookEntity = iBookRepository.findById(book.getId()).get();
			
			if(bookEntity != null) {
				
				bookEntity
				.setSelled(
						bookEntity.getSelled() == null 
						? orderDetail.getTotal() 
						: bookEntity.getSelled() + orderDetail.getTotal());
				
				bookEntity.setTotal(bookEntity.getTotal() - orderDetail.getTotal());
				
				iBookRepository.save(bookEntity);
				
			}
			
		}
		
		return orderDetailEntities;
		
	}

	@Override
	public List<OrderDTO> getAll(PageableRequest payload) {


		Specification<OrderEntity> specification = null;

		if (payload.getFilters() != null && payload.getFilters().size() > 0) {

			specification = Specification.where(new GenericPredicate<OrderEntity>(payload.getFilters().get(0)));

			for (int i = 1; i < payload.getFilters().size(); i++) {

				specification = specification.and(new GenericPredicate<OrderEntity>(payload.getFilters().get(i)));
			}
		}

		if (payload.getPaging() != null) {

			if (specification != null) {

				return convertListEntityToDTO(
						iorrderRepository.findAll(specification, payload.createPagingAndSorter()).getContent());
			}

			return convertListEntityToDTO(iorrderRepository.findAll(payload.createPagingAndSorter()).getContent());
		}

		return convertListEntityToDTO(iorrderRepository.findAll());
	}
		
		

	
	private List<OrderDTO> convertListEntityToDTO(List<OrderEntity> orders) {

		return orders
				.stream()
				.map(entity -> iOrderConverter.toDTO(entity))
				.collect(Collectors.toList());
	}

	@Override
	public Long count() {
		
		return iorrderRepository.count();
		
	}

	@Override
	public Long count(List<Filter> filters) {
		
		if (filters != null && filters.size() > 0) {

			Specification<OrderEntity> specification = null;

			specification = Specification.where(new GenericPredicate<OrderEntity>(filters.get(0)));

			for (int i = 1; i < filters.size(); i++) {

				specification = specification.and(new GenericPredicate<OrderEntity>(filters.get(i)));
			}

			return iorrderRepository.count(specification);

		}

		return iorrderRepository.count();
	}

	
	private OrderDTO convertDetailEntityToDTO(OrderEntity entity) {
		
		OrderDTO d = new OrderDTO();
		
		if(entity != null) {
			
			 d = iOrderConverter.toDTO(entity);
			
			d
			 .setOrderDetail(
			   entity
		       .getOrderDetail()
		       .stream()
		       	.map(detail -> {
		       		
		       		OrderDetailDTO result =  iOrderConverter.toOrderDetailDTO(detail);
		       		
		       		BookDTO book = iBookConverter.toDTO(detail.getBook());
		       		
		       		book
		       		 .setCategories(
		       		   detail
		       		    .getBook()
		       		    .getCategories()
		       		       .stream()
		       		       .map(c -> iCategoryConverter.toDTOs(c))
		       		       .collect(Collectors.toList()));
		       		
		       	    result.setBook(book);
		       		
		       		return result;
		       		
		       		
		       	}).collect(Collectors.toList()));
			
		}
		
		return d;
		
	}
	
	@Override
	public OrderDTO getOneById(Long id) {
		
		
		return Optional
				.ofNullable(iorrderRepository.findById(id).get())
				.map(entity->convertDetailEntityToDTO(entity)).orElseThrow(()->new EntityNotFoundException("order with id " + id));
	}

	
	@Override
	@Transactional
	public Boolean updateStatusById(Long id,String status) {
		
		OrderEntity order = iorrderRepository.findById(id).get();
		
		
		if(order != null) {
			
			
			List<OrderStatusEnum>statusList = new ArrayList<>(Arrays.asList(OrderStatusEnum.values()));
			
			
			
			
			if(statusList
					.stream()
					.filter(s->s.toString()
					.equalsIgnoreCase(status)).count() > 0 && !OrderStatusEnum.CANCEL
					.toString().equalsIgnoreCase(status)) {
				
				
				
				order.setStatus(status);
				
				iorrderRepository.save(order);
				
				
				return true;
				
			}
			
			
		}
		
		
		return false;
	}

	@Override
	@Transactional
	public Boolean removes(List<Long> ids) {
		
		try {
			
			boolean flag = true;
			
			for (Long id : ids) {
				
				OrderEntity order = iorrderRepository.findById(id).get();
				
				if(order != null && order.getStatus().equals(OrderStatusEnum.CANCEL.toString())) {
					
					iorrderRepository.deleteById(id);
					
				} else {
					
					flag = false;
				}
				
			}
			
			return flag;
			
		} catch (Exception e) {
			
			
			
			return false;
		}
		
	}

	@Override
	public List<OrderDTO> getAllByCustomerId(Long customerId) {
		
		
		return iorrderRepository
				.findAllByCustomerId(customerId)
				.stream()
				 .map(entity->convertDetailEntityToDTO(entity))
				 .collect(Collectors.toList());
		
	}

	@Override
	public Boolean cancelOrder(Long id, String reasonCancel) {
		
		OrderEntity order = iorrderRepository.findById(id).get();
		
		if(order != null) {
			
			order.setStatus(OrderStatusEnum.CANCEL.toString());
			
			order.setReasonCancel(reasonCancel);
			
			
			for (OrderDetailEntity orderDetail : order.getOrderDetail()) {
				
				BookEntity book = iBookRepository.findById(orderDetail.getBook().getId()).get();
				
				if(book != null) {
					
					book.setSelled(book.getSelled() - orderDetail.getTotal());
					
					book.setTotal(book.getTotal() + orderDetail.getTotal());
					
					iBookRepository.save(book);
					
				}
				
			}
			
			iorrderRepository.save(order);
			
		}
		
		return null;
	}
}
