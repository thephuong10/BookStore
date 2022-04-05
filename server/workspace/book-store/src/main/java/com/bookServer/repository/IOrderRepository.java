package com.bookServer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookServer.entity.OrderEntity;

public interface IOrderRepository extends JpaRepository<OrderEntity, Long>,
										 JpaSpecificationExecutor<OrderEntity> {

	@Query(
	 value = "select * from bookshop_order o where o.customer_id = :customerId",
	 nativeQuery = true)
	List<OrderEntity>findAllByCustomerId(@Param("customerId") Long customerId);
	
}
