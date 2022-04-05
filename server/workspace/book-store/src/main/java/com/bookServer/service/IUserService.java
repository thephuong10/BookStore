package com.bookServer.service;

import com.bookServer.dto.AdminDTO;
import com.bookServer.dto.CustomerDTO;
import com.bookServer.dto.UserDTO;
import com.bookServer.entity.UserEntity;

public interface IUserService {
	
	
	UserDTO getInfoById(Long id);
	
	UserEntity findOneById(Long id);
	
	UserEntity findOneByEmail(String email);
	
	Boolean existsByEmailAndProvider(String email,String provider);
	
	UserEntity findOneByEmailAndProvider(String email,String provider);
	
	Boolean existsEmail(String email);
	
	Boolean resetPassword(UserEntity user);
	
	UserEntity save(UserEntity user);
	
	UserEntity update(UserEntity user);
	
	AdminDTO findOneAdminById(Long id);
	
	CustomerDTO findOneCustomerById(Long id);
	
}
