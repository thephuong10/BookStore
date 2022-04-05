package com.bookServer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookServer.entity.ReviewsEntity;

public interface IReviewsRepository extends JpaRepository<ReviewsEntity, Long>,
											JpaSpecificationExecutor<ReviewsEntity> {

	
	
	List<ReviewsEntity>findAllByStatus(String status,Pageable pageable);
	
	@Query(
      value = "select * from bookshop_reviews r "
      		+ "where r.user_id = :userId and r.book_id = :bookId",
	  nativeQuery = true)
	Optional<ReviewsEntity> findOneByBookIdAndCustomerId(@Param("bookId") Long bookId,
			@Param("userId") Long userId);
}
