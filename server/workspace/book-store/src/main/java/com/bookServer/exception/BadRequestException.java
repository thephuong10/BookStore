package com.bookServer.exception;

public final class BadRequestException extends RuntimeException {
	public BadRequestException() {
		super();
	}
	public BadRequestException(final String message) {
		super(message);
	}
}
