package com.bookServer.security.oauth2.user;

import java.util.Map;

import com.bookServer.enums.AuthProviderEnum;
import com.bookServer.exception.OAuth2AuthenticationProcessingException;

public class OAuth2UserInfoFactory {

	public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(AuthProviderEnum.google.toString())){
        	
            return new GoogleOAuth2UserInfo(attributes);
         }
         else if (registrationId.equalsIgnoreCase(AuthProviderEnum.facebook.toString())) {
            return new FacebookOAuth2UserInfo(attributes);
        }

          else {
            throw 
             new OAuth2AuthenticationProcessingException("Sorry! Login with "
            + registrationId + " is not supported yet.");
        }
    }
}
