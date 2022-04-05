package com.bookServer.controller.user;

import java.util.Collections;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookServer.constant.MessageConstant;
import com.bookServer.exception.EntityNotFoundException;
import com.bookServer.payload.SignInRequest;
import com.bookServer.security.TokenProvider;
import com.bookServer.security.UserPrincipal;
import com.bookServer.service.IUserService;

@RestController
public class AdminController {

	@Autowired
	private TokenProvider tokenProvider;

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private IUserService iuserService;
	
	
	@PostMapping("/api/admin/signin")
	public ResponseEntity<?> signinAdmin(@Valid @RequestBody SignInRequest payload) {
		try {


			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(payload.getEmail(), payload.getPassword()));

			SecurityContextHolder.getContext().setAuthentication(authentication);

			UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

			if (user.getAuthorities() != null
					&& !user.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_CUSTOMER"))) {

				String token = tokenProvider.createToken(user.getId());

				return ResponseEntity.ok(Collections.singletonMap("token", token));

			}

			return ResponseEntity.status(401).body(MessageConstant.Response.SC_UNAUTHORIZED);

		} catch (Exception e) {

			e.printStackTrace();

			return ResponseEntity.status(500).body(e.getMessage());

		}
	}
	
	@GetMapping("/auth/api/admin/info")
	public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserPrincipal user){
		
		try {
			
			if (user.getAuthorities() != null
					&& !user.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_CUSTOMER"))) {

				
				return ResponseEntity
						.ok(iuserService.findOneAdminById(user.getUserDetailId()));

			}
			
			return ResponseEntity
					.status(401)
					.body(MessageConstant.Response.SC_UNAUTHORIZED);
			
		} catch (EntityNotFoundException e) {
				
			return ResponseEntity
					.status(400)
					.body(e.getMessage());
		}
		
	}
}
