package com.bookServer.service.impl;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.bookServer.dto.MailDTO;
import com.bookServer.exception.APIInvalidException;
import com.bookServer.service.IMailService;


@Service
@PropertySource(value = "classpath:properties.properties")
public class MailService implements IMailService {
	
	@Value("${verifyEmail.url}")
	private String verifyEmailUrl;
	
	@Value("${verifyEmail.apiKeyValue}")
	private String verifyEmailKeyValue;
	
	@Value("${verifyEmail.apiKeyName}")
	private String verifyEmailKeyName;
	
	
	@Autowired
	private JavaMailSender mailSender;
	
	
	@Override
	public void sendMail(MailDTO mail) throws MessagingException {
		
		MimeMessage message = mailSender.createMimeMessage();
		
		MimeMessageHelper messageHelper = new MimeMessageHelper(message,true,"UTF-8");
		
		
		messageHelper.setTo(mail.getTo());
		
		messageHelper.setSubject(mail.getSubject());
		
		messageHelper.setText(mail.getContent());
		
		mailSender.send(message);
		
	}

	@Override
	public Boolean verifyEmailExists(String email) {
		
		
		HttpsURLConnection https = null;
		
		
		
		
		String url = UriComponentsBuilder
		 .fromUriString(verifyEmailUrl)
		 .queryParam(verifyEmailKeyName, verifyEmailKeyValue)
		 .queryParam("email", email)
		 .build()
		 .toUriString();
		
		
		
		try {
			URL urlEntity = new URL(url);
			
			https = (HttpsURLConnection) urlEntity.openConnection();
			
			https.setRequestMethod("GET");
			https.addRequestProperty("User-Agent","Mozilla/5.0");
			https.setUseCaches(false);
			https.setDoOutput(true);
			
			BufferedReader response = new BufferedReader(
						         new InputStreamReader(
							       https.getInputStream()
							       )
					            );
			
			String inputLine = response.readLine();
			
			StringBuffer result = new StringBuffer();
			
			while (inputLine != null) {
				
				result.append(inputLine);
				
				
				inputLine = response.readLine();
				
			}
			
			response.close();
			
			
			if(result.toString().contains("\"status\":\"valid\"")) {
				
				return true;
			}
			
			else if(result.toString().contains("\"error\"")) {
				throw new APIInvalidException();
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			
		} finally {
			
			if(https != null) {
				
				https.disconnect();
			}
		}
		
		
		
		
		return false;
	}

}
