package com.bookServer.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.bookServer.security.CustomDetailService;
import com.bookServer.security.RestAuthenticationEntryPoint;
import com.bookServer.security.TokenAuthenticationFilter;
import com.bookServer.security.oauth2.CustomOauth2UserService;
import com.bookServer.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.bookServer.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.bookServer.security.oauth2.OAuth2AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class securityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
	
	@Autowired
	private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
	
	@Autowired
	private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
	
	@Autowired
	private CustomDetailService customDetailService;
	
	@Autowired
	private CustomOauth2UserService customOauth2UserService;
	
	@Autowired
	private TokenAuthenticationFilter tokenAuthenticationFilter;
	
	@Autowired
	private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
	
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	@Override
	public AuthenticationManager authenticationManager() throws Exception {
		
		return super.authenticationManager();
	}
	
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
		 .userDetailsService(customDetailService)
		 .passwordEncoder(passwordEncoder());
	}
	
	
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
			
		http
			.cors()
			 .and()
			.sessionManagement()
			 .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		     .and()
		    .csrf()
		     .disable()
		    .formLogin()
		     .disable()
		    .httpBasic()
		     .disable()
		    .exceptionHandling()
		     .authenticationEntryPoint(restAuthenticationEntryPoint)
		     .and()
		    .authorizeRequests()
		     .antMatchers("/auth/**")
		     .authenticated()
		     .antMatchers("/api/**")
		     .permitAll()
		     .and()
		    .oauth2Login()
		     .authorizationEndpoint()
		      .baseUri("/oauth2/authorize")
		      .authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository)
		      .and()
		     .redirectionEndpoint()
		      .baseUri("/oauth2/callback/*")
		      .and()
		     .userInfoEndpoint()
		      .userService(customOauth2UserService)
		      .and()
		     .successHandler(oAuth2AuthenticationSuccessHandler)
		     .failureHandler(oAuth2AuthenticationFailureHandler)
		     ;
		     

		http.addFilterBefore(tokenAuthenticationFilter,
				UsernamePasswordAuthenticationFilter.class);
		
		
	}
}
