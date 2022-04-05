package com.bookServer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MailDTO {
	private String to;
	private String subject;
	private String content;
	
	public MailDTO(String to, String subject,String content) {
		super();
		this.to = to;
		this.subject = subject;
		this.content = content;
	}
}
