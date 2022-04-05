package com.bookServer.exception;

public class EntityNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public EntityNotFoundException() {
		super("Entity not Found !!!");
	}
	
	public EntityNotFoundException(String entity) {
		super(String.format("%s not Found !!!", entity));
	}
	
	

}
