package com.bookServer.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bookServer.entity.UserEntity;
import com.bookServer.enums.UserTypeEnum;
import com.bookServer.exception.ResourceNotFoundException;
import com.bookServer.repository.IAdminRepository;
import com.bookServer.repository.ICustomerRepository;
import com.bookServer.repository.IUserRespository;

@Service
public class CustomDetailService implements UserDetailsService {
	
	
	@Autowired
	private IUserRespository iuserRespository;
	
	@Autowired
	private IAdminRepository iAdminRepository;
	
	@Autowired
	private ICustomerRepository iCustomerRepository;
	
	
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		
		return Optional
	            .ofNullable(
			      iuserRespository
			       .findOneByEmail(email).get()
			     )
	             .map(entity -> {
	            	
	            	 setUserDetailId(entity);
	            	 
	            	 UserPrincipal user = UserPrincipal.create(entity);
	            	 
	            	 user.setUserDetailId(entity.getUserDetailId());
	            	 
	            	 
	            	 return user;
	            	 
	             })	
			     .orElseThrow(()->
			        new ResourceNotFoundException("User", "email", email)
			     );
		
	}
	
	
	public UserDetails loadUserById(Long id) {
		
		return Optional
	            .ofNullable(
			      iuserRespository
			       .findById(id).get()
			     )
	             .map(entity -> {
	            	  
	            	 setUserDetailId(entity);
	            	 
	            	 UserPrincipal user = UserPrincipal.create(entity);

	            	 user.setUserDetailId(entity.getUserDetailId());
	            	 
	            	 
	            	 return user;
	            	 
	             })	
			     .orElseThrow(()->
			        new ResourceNotFoundException("User", "id", id)
			     );
	}
	
	private void setUserDetailId(UserEntity user) {
		
		
		if (user.getUserType().equals(UserTypeEnum.admin.toString())) {
			
			user.setUserDetailId(iAdminRepository.findByUserId(user.getId()).getId());
			
		} else {
			
			user.setUserDetailId(iCustomerRepository.findByUserId(user.getId()).getId());
			
		}
		
		
	}
}
