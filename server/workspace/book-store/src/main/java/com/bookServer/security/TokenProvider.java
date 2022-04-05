package com.bookServer.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
@PropertySource(value = "classpath:properties.properties")
public class TokenProvider {
	
	@Value("${tokenSecret}")
	private String secretKey;
	
	@Value("${tokenExpirationMsec}")
	private String tokenExpiration;
	
	public String createToken(Long id) {
		
		return Jwts
				.builder()
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setSubject(Long.toString(id))
				.setExpiration(
				 new Date(System.currentTimeMillis() + new Long(tokenExpiration))
				 )
				.signWith(SignatureAlgorithm.HS256, secretKey)
				.compact();
		
	}
	
	public Long getIdFromToken(String token) {
		
		return Long.parseLong(
				Jwts
				 .parser()
				 .setSigningKey(secretKey)
				 .parseClaimsJws(token)
				 .getBody()
				 .getSubject()
				);
	}
	
//	public Long validateToken(String token) {
//		
//		try {
//			return Long.parseLong(
//					Jwts
//					 .parser()
//					 .setSigningKey(secretKey)
//					 .parseClaimsJws(token)
//					 .getBody()
//					 .getSubject()
//					);
//			
//		} catch (ExpiredJwtException expired) {
//			System.out.println("JWT expired");
//
//		} catch (MalformedJwtException |
//				 UnsupportedJwtException | 
//				 IllegalArgumentException | 
//				 SignatureException
//				 exception) {
//			System.out.println("Invalid JWT signature");
//
//		}
//		return null;
//	}
}
