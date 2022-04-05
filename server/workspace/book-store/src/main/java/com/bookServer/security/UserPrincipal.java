package com.bookServer.security;

import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.bookServer.entity.UserEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserPrincipal implements OAuth2User , UserDetails {


	private static final long serialVersionUID = 1L;

	private String email;
	private String password;
	private Long id;
	private Long userDetailId;
	private Collection<? extends GrantedAuthority>authorities;
	private Map<String, Object>attributes;
	private Boolean status;
	
	
	public static UserPrincipal create(UserEntity userEntity) {
		return new UserPrincipal(
				userEntity.getEmail(), 
				userEntity.getPassword(), 
				userEntity.getId(),
				userEntity.getRoles()
							.stream()
							 .map(role-> new SimpleGrantedAuthority(role.getCode()))
							 .collect(Collectors.toList())
				);
				
	}
	
	public static UserPrincipal create(UserEntity user, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }
	
	
	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return String.valueOf(id);
	}

	
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}


	public UserPrincipal(String email, String password, Long id, Collection<? extends GrantedAuthority> authorities) {
		super();
		this.email = email;
		this.password = password;
		this.id = id;
		this.authorities = authorities;
	}


}
