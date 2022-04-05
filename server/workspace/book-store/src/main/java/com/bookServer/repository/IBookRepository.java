package com.bookServer.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookServer.entity.BookEntity;

public interface IBookRepository extends JpaRepository<BookEntity, Long>,
										 JpaSpecificationExecutor<BookEntity> {

	Page<BookEntity> findAllByNameContainingIgnoreCase(String name, Pageable pageable);

	Long countByNameContainingIgnoreCase(String search);
	
	
	@Query("SELECT MIN(b.price) as min,MAX(b.price) as max "
			+ "FROM BookEntity b "
			+ "WHERE b.type = :value1 OR UPPER(b.name) LIKE %:value2%")
	Object[] findMinAndMaxPriceByTypeOrName(@Param("value1") String value1,
			@Param("value2") String value2);
	
	@Query("SELECT MIN(b.price) as min,MAX(b.price) as max "
			+ "FROM BookEntity b")
	Object[] findMinAndMaxPrice();
	
	@Query(value = "SELECT MIN(b.price) as min,MAX(b.price) as max "
			+ "FROM sportshop.bookshop_book b "
			+ "INNER JOIN sportshop.bookshop_category_book cb "
			+ "ON b.id = cb.book_id "
			+ "INNER JOIN sportshop.bookshop_category c "
			+ "ON c.id = cb.category_id "
			+ "WHERE c.slug = :slug",
			nativeQuery = true)
	Object[] findMinAndMaxPriceByCategories(@Param("slug") String slug);
	
	
	@Query(value = "SELECT MIN(b.price) as min,MAX(b.price) as max "
			+ "FROM sportshop.bookshop_book b "
			+ "INNER JOIN sportshop.bookshop_sale s "
			+ "ON b.sale_id = s.id "
			+ "WHERE s.slug = :slug",
			nativeQuery = true)
	Object[] findMinAndMaxPriceBySale(@Param("slug") String slug);
	
}
