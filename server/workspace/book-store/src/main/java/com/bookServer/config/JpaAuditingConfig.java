package com.bookServer.config;

import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;

import com.bookServer.security.UserPrincipal;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaAuditingConfig {
	
	@Bean
    public CustomAuditorAware auditorProvider(){
		System.out.println("auditorProvider");
        return new CustomAuditorAware();
    }
	
//	public class CustomAuditorAware implements AuditorAware<Long> {
//
//		@Override
//		public Optional<Long> getCurrentAuditor() {
//			// TODO Auto-generated method stub
//			return null;
//		}
//		
//		
//	}
	

	public class CustomAuditorAware implements AuditorAware<String> {

	    @Override
	    public Optional<String> getCurrentAuditor() {
	    	String loggedName;
	    	
	    	try {
	    		
	    		loggedName = SecurityContextHolder
			             .getContext()
			             .getAuthentication()
			             .getName();
	    		
				System.out.println("CurrentAuditor id : " + 
								((UserPrincipal)SecurityContextHolder
	    			             .getContext()
	    			             .getAuthentication().getPrincipal()).getUserDetailId());
			} catch (Exception e) {
				
				System.out.println("lỗi");
				
				
				loggedName = "";
				
			}
	    	
	        return Optional.of(StringUtils.hasText(loggedName) ? loggedName : "");
	    }

	}
	
}