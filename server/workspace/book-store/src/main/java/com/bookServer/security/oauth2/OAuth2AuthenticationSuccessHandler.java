package com.bookServer.security.oauth2;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.bookServer.exception.BadRequestException;
import com.bookServer.security.TokenProvider;
import com.bookServer.security.UserPrincipal;
import com.bookServer.utils.CookieUtils;

import static com.bookServer.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

@Component
@PropertySource(value = "classpath:properties.properties")
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@Value("${oauth2.authorizedRedirectUris}")
	private String authorizedRedirectUris;
	
	@Autowired
	private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
	
	
	@Autowired
    OAuth2AuthenticationSuccessHandler(TokenProvider tokenProvider,
                                       HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository) {
        this.tokenProvider = tokenProvider;
     
        this.httpCookieOAuth2AuthorizationRequestRepository = httpCookieOAuth2AuthorizationRequestRepository;
    }
	
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
		String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
        	
            return;
        }

        clearAuthenticationAttributes(request, response);
        
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
        
	}
	
	
	protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtils
        		.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new BadRequestException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
        }

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        String token = tokenProvider.createToken(((UserPrincipal)authentication.getPrincipal()).getId());
        
        String result = UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", token)
                .build().toUriString();
        
        System.out.println("determineTargetUrl : "+ result);

        return result;
    }
	
	
	protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
	   	 System.out.println("clearAuthenticationAttributes");
	   	 super.clearAuthenticationAttributes(request);
	       httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
   }

   private boolean isAuthorizedRedirectUri(String uri) {
       URI clientRedirectUri = URI.create(uri);

       URI authorizedURI = URI.create(authorizedRedirectUris);
       
       System.out.println("host : "+ authorizedURI.getHost()+ " , port : " + authorizedURI.getPort());
       
       if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
               && authorizedURI.getPort() == clientRedirectUri.getPort()) {
           return true;
       }
       return false;
   }
}
