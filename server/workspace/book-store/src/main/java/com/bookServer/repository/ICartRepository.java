package com.bookServer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookServer.entity.CartEntity;

public interface ICartRepository extends JpaRepository<CartEntity, Long>{

	@Query(
	 value = "select sum(c.total) from bookshop_cart c where c.customer_id = :customerId",
	 nativeQuery = true)
	Integer getTotalCartsByCustomerId(@Param("customerId") Long customerId);
	
	
	@Query(
	 value = "select * from bookshop_cart c where c.book_id = :bookId and c.customer_id = :customerId",
	 nativeQuery = true)
	Optional<CartEntity> findOneByBookIdAndCustomerId(@Param("bookId") Long bookId
			,@Param("customerId") Long customerId);
	
	
	List<CartEntity> findAllByCustomerId(Long customerId);
	
}
