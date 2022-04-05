package com.bookServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@ComponentScan({"com.bookServer.*"})
@EnableJpaRepositories({"com.bookServer.*"})
public class serverApplication {

	
	
	public static void main(String[] args) {
		
		
		SpringApplication.run(serverApplication.class, args);
		
	
		
	}
}
