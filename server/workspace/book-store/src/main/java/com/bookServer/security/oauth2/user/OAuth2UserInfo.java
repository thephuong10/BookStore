package com.bookServer.security.oauth2.user;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class OAuth2UserInfo {
	
	Map<String, Object> attributes;
	
	public OAuth2UserInfo(Map<String, Object> attributes) {
		
        this.attributes = attributes;
        System.out.println(attributes);
        
    }
	
	public abstract String getId();

    public abstract String getName();

    public abstract String getEmail();
    
}
