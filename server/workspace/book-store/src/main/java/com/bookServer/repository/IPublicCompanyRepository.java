package com.bookServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookServer.entity.PublicCompanyEntity;

public interface IPublicCompanyRepository extends JpaRepository<PublicCompanyEntity, Long> {

}
