package com.bookServer.exception;

public class AccountFailedException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public AccountFailedException() {
		super("Add account failed !!! Please try again !");
	}
	
	public AccountFailedException(String message) {
		super(message);
	}
}
