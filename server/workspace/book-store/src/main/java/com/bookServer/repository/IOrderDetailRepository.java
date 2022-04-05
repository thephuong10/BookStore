package com.bookServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookServer.entity.OrderDetailEntity;

public interface IOrderDetailRepository extends JpaRepository<OrderDetailEntity, Long> {

}
