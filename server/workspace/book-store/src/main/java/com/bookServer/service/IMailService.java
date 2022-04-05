package com.bookServer.service;

import javax.mail.MessagingException;

import com.bookServer.dto.MailDTO;

public interface IMailService {

	void sendMail(MailDTO mail) throws MessagingException;
	
	Boolean verifyEmailExists(String email);
}
