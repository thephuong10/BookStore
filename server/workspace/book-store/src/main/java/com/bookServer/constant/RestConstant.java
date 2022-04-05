package com.bookServer.constant;

public class RestConstant {
	
  public static final String SIGNUP_RESPONSE_COOKIE_NAME = "SRCN";
  
  
  public static final long SIGNUP_RESPONSE_COOKIE_EXPIRED_SEC = 300;
  
  
  public static final String TEMPLATE_MAIL_REGISTER = "mail";
  
  
  public static final String VERIFICATION_TOKEN_COOKIE_NAME = "VTCN";
  
  
  public static final Boolean USER_STATUS_ONL = true;
  
  
  public static final Boolean USER_STATUS_OFF = false;
  
  
  public static class Pageable {

		public static final Integer LIMIT = 5;

		public static final String ORDER_BY_ASC = "asc";
		
		public static final String ORDER_BY_DESC = "desc";
	}
  
}
