package com.bookServer.exception;

public class SaveFailedException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public SaveFailedException() {
		super("Save failed !!!");
	}
	
	public SaveFailedException(String entity) {
		super(String.format("%s Save failed !!!", entity));
	}
}
