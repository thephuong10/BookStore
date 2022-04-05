package com.bookServer.security.oauth2;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.bookServer.entity.CustomerEntity;
import com.bookServer.entity.UserEntity;
import com.bookServer.enums.AuthProviderEnum;
import com.bookServer.enums.RolesEnum;
import com.bookServer.enums.UserTypeEnum;
import com.bookServer.exception.AccountFailedException;
import com.bookServer.exception.OAuth2AuthenticationProcessingException;
import com.bookServer.repository.ICustomerRepository;
import com.bookServer.repository.IRoleRepository;
import com.bookServer.repository.IUserRespository;
import com.bookServer.security.UserPrincipal;
import com.bookServer.security.oauth2.user.OAuth2UserInfo;
import com.bookServer.security.oauth2.user.OAuth2UserInfoFactory;

@Component
public class CustomOauth2UserService extends DefaultOAuth2UserService {
	 	@Autowired
	    private IUserRespository iUserRespository;
	 	
	 	@Autowired
		private IRoleRepository iRoleRepository;
	 
		@Autowired
		private ICustomerRepository iCustomerRepository;
		
	    @Override
	    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
	        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
	        
	        try {

	            return processOAuth2User(oAuth2UserRequest, oAuth2User);
	            
	        } catch (AuthenticationException ex) {
	            throw ex;
	        } catch (Exception ex) {
	            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
	            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
	        }
	        
	        
	    }

	    @SuppressWarnings("unlikely-arg-type")
		private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
	        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory
	        		.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());

	        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
	            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
	        }
	        
	     
	        Optional<UserEntity>userEntity = iUserRespository.findOneByEmail(oAuth2UserInfo.getEmail());
	        
	        UserEntity user;
	        
	        if(userEntity.isPresent()) {
	        	user = userEntity.get();
	            if(user.getProvider()
	            		.equals(AuthProviderEnum
	            				.local.toString())) {
	                throw new OAuth2AuthenticationProcessingException("Có vẻ như bạn đã đăng ký bằng tài khoản cục bộ" + ". Vui lòng sử dụng tài khoản cục bộ của bạn để đăng nhập");
	            }
	            user = updateExistingUser(user, oAuth2UserInfo);
	        } else {
	        	
	        	user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
	        	
	        }
	       
	        
	        return UserPrincipal.create(user, oAuth2User.getAttributes());
	    }

	    private UserEntity registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
	    	UserEntity user = new UserEntity();
	        user.setProvider(AuthProviderEnum
	        		.valueOf(oAuth2UserRequest
	        				.getClientRegistration()
	        				.getRegistrationId()).toString());
	        user.setProviderId(oAuth2UserInfo.getId());
	        user.setFullname(oAuth2UserInfo.getName());
	        user.setEmail(oAuth2UserInfo.getEmail());
	        user.setRoles(Collections.singleton(iRoleRepository
	                .findOneByCode(RolesEnum.ROLE_CUSTOMER.toString()).get()));
	    	        user.setUserType(UserTypeEnum.customer.toString());
	    	        
	    	        
	        return Optional
					.ofNullable(iUserRespository.save(user))
					.map(u -> {
						
						CustomerEntity customer = new CustomerEntity();
						
						customer.setUser(u);
						
						iCustomerRepository.save(customer);
						
						return u;
						
					}).orElseThrow(()-> new AccountFailedException());
	    }

	    private UserEntity updateExistingUser(UserEntity existingUser, OAuth2UserInfo oAuth2UserInfo) {

	        existingUser.setFullname(oAuth2UserInfo.getName());
	        existingUser.setProviderId(oAuth2UserInfo.getId());
	       
	        return iUserRespository.save(existingUser);
	    }
	    
	    
	    
	    
}
