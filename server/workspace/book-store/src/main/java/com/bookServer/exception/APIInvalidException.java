package com.bookServer.exception;

public class APIInvalidException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public APIInvalidException() {
		super("Invalid API Key or your account ran out of credits");
	}

}
