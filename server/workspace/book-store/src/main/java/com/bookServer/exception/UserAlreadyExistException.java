package com.bookServer.exception;

public class UserAlreadyExistException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserAlreadyExistException() {
		super();
	}

	public UserAlreadyExistException(final String fieldUser) {
		super(String.format("Email %s already exists !", fieldUser));
	}

}
