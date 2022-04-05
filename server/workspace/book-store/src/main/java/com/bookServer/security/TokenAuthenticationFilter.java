package com.bookServer.security;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class TokenAuthenticationFilter extends OncePerRequestFilter {
	 
	private String bearerToken="Bearer ";
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@Autowired
	private CustomDetailService customDetailService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
			FilterChain filterChain)
			throws ServletException, IOException {

		String token = getTokenFromRequest(request);
		
		
		try {
			if(StringUtils.hasText(token)) {
				Optional<Long>userId = Optional
						.ofNullable(tokenProvider.getIdFromToken(token));
							
				if(userId.isPresent()) {
					

					UserDetails userDetails = customDetailService
							.loadUserById(userId.get());

					
					UsernamePasswordAuthenticationToken authentication = 
							new UsernamePasswordAuthenticationToken(
									userDetails,
									null, 
									userDetails.getAuthorities());
					
					SecurityContextHolder
					 .getContext()
					  .setAuthentication(authentication);
					
				}
				
			}
		} catch (Exception ex) {
			logger.error("Could not set user authentication in security context", ex);
		}
		
		
		filterChain.doFilter(request, response);
		
	}
		
	private String getTokenFromRequest(HttpServletRequest request) {
		
		
		String token = request.getHeader("Authorization");
		
		if(StringUtils.hasText(token) && token.startsWith(bearerToken)) {
			return token.substring(bearerToken.length());
		}
		
		
		
		return null;
		
		
	}
}
