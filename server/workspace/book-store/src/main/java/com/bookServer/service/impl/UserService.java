package com.bookServer.service.impl;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.bookServer.converter.IUserConverter;
import com.bookServer.dto.AdminDTO;
import com.bookServer.dto.CustomerDTO;
import com.bookServer.dto.UserDTO;
import com.bookServer.entity.AdminEntity;
import com.bookServer.entity.CustomerEntity;
import com.bookServer.entity.UserEntity;
import com.bookServer.enums.AuthProviderEnum;
import com.bookServer.enums.UserTypeEnum;
import com.bookServer.exception.AccountFailedException;
import com.bookServer.exception.EntityNotFoundException;
import com.bookServer.exception.SaveFailedException;
import com.bookServer.exception.UserAlreadyExistException;
import com.bookServer.repository.IAdminRepository;
import com.bookServer.repository.ICustomerRepository;
import com.bookServer.repository.IUserRespository;
import com.bookServer.service.IUserService;

@Service
public class UserService implements IUserService {
	
	@Autowired
	private IUserRespository iuserRespository;
	
	@Autowired
	private IAdminRepository iAdminRepository;
	
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private ICustomerRepository iCustomerRepository;
	
	@Autowired
	private IUserConverter iuserConverter;
	

	@Override
	public Boolean existsEmail(String email) {
		
		return iuserRespository.existsByEmail(email);
	}

	
	@Override
	public UserEntity findOneByEmail(String email) {
		
		return iuserRespository
			.findOneByEmail(email)
			.map(user-> user)
			.orElseThrow(()-> new EntityNotFoundException("Account"));
	}



	@Override
	@Transactional
	public Boolean resetPassword(UserEntity payload) {
		
		return Optional
				 .ofNullable(payload)
				 .map(user -> {
					 
					 user.setPassword(passwordEncoder.encode(payload.getPassword()));
					 
					 return iuserRespository.save(user) != null;
					 
				 }).get();
	}
	
	
	
	@Override
	@Transactional
	public UserEntity update(UserEntity user) {

		return Optional
				.ofNullable(
				 iuserRespository.save(user)
				)
				.orElseThrow(()-> new SaveFailedException("user"));
	}

	@Override
	public UserEntity findOneById(Long id) {
		
		return Optional
				.ofNullable(
				 iuserRespository.findById(id).get()
				).map(user -> {
					
					setUserDetailId(user);
					
					return user;
				})
				.orElseThrow(()-> new SaveFailedException("user"));
	}



	private void setUserDetailId(UserEntity user) {
			
		if (user.getUserType().equals(UserTypeEnum.admin.toString())) {
			
			user.setUserDetailId(iAdminRepository.findByUserId(user.getId()).getId());
			
		} else {
			
			user.setUserDetailId(iCustomerRepository.findByUserId(user.getId()).getId());
			
		}
		
		
	}

	@Override
	public UserDTO getInfoById(Long id) {
		return iuserRespository
				.findById(id)
				.map(user-> {
					
					UserDTO userDTO = new UserDTO();
					
					userDTO.setEmail(user.getEmail());
					
					userDTO.setFullname(user.getFullname());
					
									
					return userDTO;
				})
				.orElseThrow(()-> new EntityNotFoundException("Account"));
	}

	@Override
	public UserEntity findOneByEmailAndProvider(String email, String provider) {
		
		return iuserRespository
				.findOneByEmailAndProvider(email, provider)
				.map(user-> user)
				.orElseThrow(()-> new EntityNotFoundException("Account"));
		
	}



	@Override
	public Boolean existsByEmailAndProvider(String email, String provider) {
		
		return iuserRespository.existsByEmailAndProvider(email, provider);
	}
	

	@Override
	@Transactional
	public UserEntity save(UserEntity user) {
		
		
		if(existsEmail(user.getEmail())) {
			
			throw new UserAlreadyExistException();
		}
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setProvider(AuthProviderEnum.local.toString());
		user.setUserType(UserTypeEnum.customer.toString());
		
		
		return Optional
				.ofNullable(iuserRespository.save(user))
				.map(u-> {
					
					CustomerEntity customer = new CustomerEntity();
					
					u.setId(user.getId());
					
					customer.setUser(u);
					
					iCustomerRepository.save(customer);
					
					return u;
					
				})
				.orElseThrow(()-> new AccountFailedException());
	}

	@Override
	public AdminDTO findOneAdminById(Long id) {
		
		
		return Optional
				.ofNullable(iAdminRepository.findById(id).get())
				.map(admin->{
					
					AdminDTO aDto = iuserConverter.toAdminDTO(admin);
					
					aDto
					 .getUser()
					 .setPassword(
						StringUtils.hasText(aDto.getUser().getPassword())
						? "true" : null);
					
					return aDto;
					
				}).orElseThrow(()-> new EntityNotFoundException("Account"));
	}

	@Override
	public CustomerDTO findOneCustomerById(Long id) {
		
		
		return Optional
				.ofNullable(iCustomerRepository.findById(id).get())
				.map(customer->{
					
					CustomerDTO cDto = iuserConverter.toCustomerDTO(customer);
					
					cDto
					 .getUser()
					 .setPassword(
						StringUtils.hasText(cDto.getUser().getPassword())
						? "true" : null);
					
					return cDto;
					
				}).orElseThrow(()-> new EntityNotFoundException("Account"));
		
		
	}

	


	
}
