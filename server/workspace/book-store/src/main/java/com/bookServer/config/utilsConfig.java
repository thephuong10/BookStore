package com.bookServer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
@PropertySource(value = "classpath:properties.properties")
public class utilsConfig {
	
	@Value("${cloud.name}")
	private String cloudName;
	
	@Value("${cloud.key}")
	private String cloudKey;
	
	@Value("${cloud.secret}")
	private String cloudSecret;
	
	
	@Bean
	public RestTemplate restTemplate() {
		
		return new RestTemplate();
	}
	

	@Bean(name = "multipartResolver")
	public MultipartResolver getMultipartResolver() {
		
		System.out.println("multipartResolver");
		CommonsMultipartResolver resolver = new CommonsMultipartResolver();
		resolver.setMaxUploadSize(1000000000);
		//resolver.setDefaultEncoding("UTF-8");
		
		return resolver;
	}
	
	@Bean
	public Cloudinary cloudinary() {
		return new Cloudinary(
				 ObjectUtils.asMap("cloud_name", cloudName,
				                   "api_key", cloudKey,
				                   "api_secret", cloudSecret,
				                   "secure", true)
				               );
	}
	
	@Bean
	public ObjectMapper objectMapper() {
		
		return new ObjectMapper();
	}
}
