package com.bookServer.utils;

import java.util.Base64;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.SerializationUtils;

public class CookieUtils {
	public static Optional<Cookie> getCookie(HttpServletRequest request,String key) {
		
		Cookie []cookies = request.getCookies();

	        System.out.println("getCookie : "+ key);
	        try {
				for (Cookie cookie : cookies) {
					System.out.println("name : " + cookie.getName() + " , value : "+cookie.getValue());
				}
				 System.out.println("--------------------------------");
			} catch (Exception e) {
				// TODO: handle exception
			}
		
		if(cookies!= null && cookies.length > 0) {
			for (Cookie cookie : cookies) {
				if(cookie.getName().equals(key)) {
					return Optional.of(cookie);
				}
			}
		}
		
		
		
		return Optional.empty();
	}
	
	
	public static void addCookie(HttpServletResponse response,String key,String value,long maxAge) {
		
		Cookie cookie = new Cookie(key, value);
		
		cookie.setHttpOnly(true);
		cookie.setMaxAge((int) maxAge);
		cookie.setPath("/");
		
		response.addCookie(cookie);
	}
	
	
	public static void deleteCookie(HttpServletRequest request,HttpServletResponse response,String key) {
		
		Cookie []cookies = request.getCookies();
		
		
		if(cookies!= null && cookies.length > 0) {
			for (Cookie cookie : cookies) {
				if(cookie.getName().equals(key)) {
					cookie.setHttpOnly(true);
					cookie.setMaxAge(0);
					cookie.setPath("/");
					cookie.setValue("");
					response.addCookie(cookie);
				}
			}
		}
		
		
	}
	
	public static String serialize(Object object) {
		return Base64
				.getUrlEncoder()
				.encodeToString(SerializationUtils.serialize(object));
	}
	
	public static <T> T deserialize(Class<T>tClass,String url) {
		return tClass.cast(
				SerializationUtils
				 .deserialize(
						 Base64
							.getUrlDecoder()
							.decode(url)
						 )
				);
	}
}
