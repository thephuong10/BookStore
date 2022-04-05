package com.bookServer.controller.user;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookServer.constant.MessageConstant;
import com.bookServer.entity.UserEntity;
import com.bookServer.exception.EntityNotFoundException;
import com.bookServer.security.UserPrincipal;
import com.bookServer.service.IUserService;

@RestController
@RequestMapping("/auth/api/user/update")
public class UserController {

	
	@Autowired
	private IUserService iuserService;

	@Autowired
	private PasswordEncoder passwordEncoder;
	

	
	@PatchMapping("/password")
	public ResponseEntity<?> updatePassWord(@AuthenticationPrincipal UserPrincipal user,
			@RequestParam(name = "passwordOld") String passwordOld,
			@RequestParam("passwordNew") String passwordNew) {

		try {

			UserEntity userEntity = iuserService.findOneById(user.getId());
			
			if(!StringUtils.hasText(userEntity.getPassword())) {
				
				userEntity.setPassword(passwordEncoder.encode(passwordNew));
				
				return ResponseEntity.ok(MessageConstant.Response.SC_OK);
				
				
			} else {
				
				if(passwordEncoder.matches(passwordOld, userEntity.getPassword())) {
					
					userEntity.setPassword(passwordEncoder.encode(passwordNew));
					
					iuserService.update(userEntity);
					
					return ResponseEntity.ok(MessageConstant.Response.SC_OK);
					
				}
				
				
			}
			

			return ResponseEntity.status(400)
					.body(Collections.singletonMap("message", "Mật khẩu không chính xác"));

		} catch (EntityNotFoundException e) {

			
			return ResponseEntity.status(400).body(Collections.singletonMap("message", e.getMessage()));
		}

	}
	
	@PutMapping("/info")
	public ResponseEntity<?> updateInfo(@AuthenticationPrincipal UserPrincipal user,
				@RequestBody UserEntity payload
			){
		
		try {
			
			UserEntity userEntity = iuserService.findOneById(user.getId());
			
			userEntity.setFullname(payload.getFullname());
			
			
			if(StringUtils.hasText(payload.getPhone())) {
				
				userEntity.setPhone(payload.getPhone());
			}
			
			iuserService.update(userEntity);
			
			return ResponseEntity
					.ok(MessageConstant.Response.SC_OK);
			
		} catch (EntityNotFoundException e) {
				
			return ResponseEntity
					.status(400)
					.body(e.getMessage());
		}
		
	}
}
