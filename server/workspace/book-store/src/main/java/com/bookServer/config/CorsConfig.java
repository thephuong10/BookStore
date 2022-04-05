package com.bookServer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@PropertySource(value = "classpath:properties.properties")
public class CorsConfig {
	
	@Value("${clientHomeOrigin}")
	private String homeOrigin;
	
	@Value("${clientAdminOrigin}")
	private String adminOrigin;
	
	
	private final class WebMvcConfigurerAdapterExtension implements WebMvcConfigurer {
		
		@Override
		public void addCorsMappings(CorsRegistry registry) {

			registry.addMapping("/**")
			.allowedOrigins(homeOrigin,adminOrigin)
			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
			.allowedHeaders("Origin","Accept",
					   		"Content-Type",
					   		"Access-Control-Request-Method",
					   		"Access-Control-Request-Headers",
					   		"Authorization")
			.allowCredentials(true)
			.maxAge(3600);
			
		}
		
	}

	@Bean
    public WebMvcConfigurer corsConfigurer() {
		 return new WebMvcConfigurerAdapterExtension();
    }

}
