package com.bookServer.controller;

import java.net.MalformedURLException;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookServer.constant.MessageConstant;
import com.bookServer.dto.MailDTO;
import com.bookServer.entity.UserEntity;
import com.bookServer.entity.VerificationTokenEntity;
import com.bookServer.enums.RolesEnum;
import com.bookServer.exception.APIInvalidException;
import com.bookServer.exception.SaveFailedException;
import com.bookServer.exception.UserAlreadyExistException;
import com.bookServer.payload.SignUpRequest;
import com.bookServer.security.TokenProvider;
import com.bookServer.service.IMailService;
import com.bookServer.service.IRoleService;
import com.bookServer.service.IUserService;
import com.bookServer.service.IVerificationTokenService;
import com.bookServer.utils.FuncitionUtils;
import com.bookServer.utils.MapValueResponse;


@RestController
@RequestMapping("/api/signup")
@Validated
public class SignUpController {
	
	@Autowired
	private IUserService iuserService;
	
	@Autowired
	private IVerificationTokenService iverificationTokenService;
	
	@Autowired
	private IMailService imailService;
	
	@Autowired
	private IRoleService iroleService;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@PostMapping
 	public ResponseEntity<?>signup(@Valid @RequestBody SignUpRequest payload) 
			throws MessagingException{
	
			try {
				
				UserEntity userEntity = new UserEntity();
				
				
				userEntity.setEmail(payload.getEmail());
				userEntity.setPassword(payload.getPassword());
				userEntity.setFullname(payload.getFullname());
				userEntity.setRoles(Collections
						.singleton(
						 iroleService
						 .findOneByCode(RolesEnum.ROLE_CUSTOMER.toString())
						 ));
				
				userEntity = iuserService.save(userEntity);
				
				String token = tokenProvider.createToken(userEntity.getId());
				
				return ResponseEntity
						.ok(Collections.singletonMap("token", token));
				
			} catch (UserAlreadyExistException e) {
				// TODO: handle exception
				
				return ResponseEntity
						.status(400)
						.body(Collections.singletonMap("error", e.getMessage()));
				
			} catch (Exception e) {
				
				return ResponseEntity
						.status(500)
						.body(e.getMessage());
				
			}
			
		
	}

	
	@PostMapping("/confirm/email/{email}")
	public ResponseEntity<?>checkEmailAffterSignup(
			@PathVariable(name = "email") 
			@NotBlank(message = "Không được để trống trường này") 
			@Email(message = "Email không hợp lệ") String email) 
			throws MessagingException{

		
			try {
				
				if(iuserService.existsEmail(email)) {
					
					return ResponseEntity
							.status(400)
							.body(Collections.singletonMap("message", MessageConstant.Mail.EMAIL_IS_ALREADY));
					
				}
				
				
				String code = FuncitionUtils.createVerificationToken();
				
				VerificationTokenEntity entity = new VerificationTokenEntity();
				
				entity.setCode(code);
				entity.setEmail(email);

				
				imailService.sendMail(
						new MailDTO(
								email,
								 MessageConstant
								  .Mail
								   .MAIL_SUBJECT,
								 MessageConstant
								  .Mail
								   .createContentVerificationToken(
									email,
									 code
									)
								)
					          );
				
				iverificationTokenService.save(entity);
				
				return ResponseEntity
						 .status(200)
						 .body(MapValueResponse
								    .getInstance()
									.put("email",email)
									.put("duration",2*60*1000)
									.getAndReset());
							
				
			} catch (UserAlreadyExistException | 
					 APIInvalidException  | 
					 SendFailedException | 
					 MailSendException
					 e) {

				
				return ResponseEntity
						.status(400)
						.body(e.getMessage());
				
			} 
		
		
	}
	
	
	
	@PostMapping("/confirm/token")
	public ResponseEntity<?> confirmSignUp(
		@RequestParam(name = "email") 
		@NotBlank(message = "Không được để trống trường này") 
		@Email(message = "Email không hợp lệ") String email,
		@RequestParam(name = "token") 
		@NotBlank(message = "Không được để trống trường này") 
		@Size(min = 5,max = 5, message = "Phải đủ 5 kí tự") String token) 
			throws MalformedURLException {
	
		String errorParam = "Không tồn tại";
		
		try {
			
			Optional<VerificationTokenEntity>optional = iverificationTokenService
                    .findOneByCodeAndEmail(
                       token,
                       email
                      );
			VerificationTokenEntity entity=null;
			if(optional.isPresent()) {	
				
				entity = optional.get();
				if(entity
					.getExpirationAt()
					 .compareTo(new Date(System.currentTimeMillis())) >= 0) {
					
					iverificationTokenService.delete(email);
					
					return ResponseEntity
							.status(200)
							.body(
							  Collections
							   .singletonMap(
								 "email",
								email
								)
							 );
				}
				 else {
					
					errorParam = "đã hết hạn";
				}
			}
			
			 return ResponseEntity
					.status(400)
					.body(
					  MapValueResponse
					    .getInstance()
					   .put("email",email)
					   .put("message",String.format("Mã xác thực %s !!!",errorParam))
					   .getAndReset()
					 );
		
			 
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return ResponseEntity
					.status(500)
					.body(Collections.singletonMap("message", MessageConstant.Response.SC_INTERNAL_SERVER_ERROR));
		}
		
		
	}

	
	@GetMapping("/resend/token/{email}")
	public ResponseEntity<?>codeResend(@PathVariable String email) {
		
		try {
			
			
			String code = FuncitionUtils.createVerificationToken();
			
			VerificationTokenEntity entity = new VerificationTokenEntity();
			
			imailService
			 .sendMail(
			   new MailDTO(
					email, 
					MessageConstant
					 .Mail
					  .MAIL_SUBJECT,  
					  MessageConstant
					  .Mail
					   .createContentVerificationToken(
						 email,
						  code
)  
			           )	 
			          );
			
			entity.setCode(code);
			entity.setEmail(email);
			
			iverificationTokenService.save(entity);
			
			return ResponseEntity
					 .status(200)
					 .body(Collections.singletonMap("email", email));
			
			
		} catch (Exception e) {
			return ResponseEntity
					.status(500)
					.body(e.getMessage());
		}
			
	}
	
	@PostMapping("/forgotPassword/confirm/email/{email}")
	public ResponseEntity<?>forgotPassword(
			@PathVariable(name = "email") 
			@NotBlank(message = "Không được để trống trường này") 
			@Email(message = "Email không hợp lệ") String email) 
			throws MessagingException{

		
			try {
				
				if(iuserService.existsEmail(email)) {
					
					String code = FuncitionUtils.createVerificationToken();
					
					VerificationTokenEntity entity = new VerificationTokenEntity();
					
					entity.setCode(code);
					entity.setEmail(email);

					
					imailService.sendMail(
							new MailDTO(
									email,
									 MessageConstant
									  .Mail
									   .MAIL_SUBJECT,
									 MessageConstant
									  .Mail
									   .createContentVerificationToken(
										email,
										 code
										)
									)
						          );
					
					iverificationTokenService.save(entity);
					
					
					return ResponseEntity
							 .status(200)
							 .body(MapValueResponse
									    .getInstance()
										.put("email",email)
										.put("duration",10*60*1000)
										.getAndReset());
					
				}
				
		
				return ResponseEntity
						.status(400)
						.body(Collections.singletonMap("error", MessageConstant.Mail.EMAIL_NOT_EXISTS));
				
			} catch (UserAlreadyExistException | 
					 APIInvalidException  | 
					 SendFailedException | 
					 MailSendException
					 e) {

				
				return ResponseEntity
						.status(400)
						.body(e.getMessage());
				
			} 
		
		
	}

	@PostMapping("/forgotPassword/update/password")
	public ResponseEntity<?>updatePassword(@RequestParam(name = "email") 
		@NotBlank(message = "Không được để trống trường này") 
		@Email(message = "Email không hợp lệ") String email,
		@RequestParam(name = "password") 
		@NotBlank(message = "Không được để trống trường này") 
		@Size(min = 5,max = 5, message = "Phải đủ 5 kí tự") String password) 
			throws MessagingException{
	
			try {
				
				UserEntity userEntity = iuserService.findOneByEmail(email);
				
				if(userEntity != null) {
					
					userEntity.setPassword(passwordEncoder.encode(password));
					
					iuserService.update(userEntity);
					
					
					return ResponseEntity
							.ok(MessageConstant.Response.SC_OK);
				}
				
				
			} catch (UserAlreadyExistException | SaveFailedException e) {
				// TODO: handle exception
				
				return ResponseEntity
						.status(400)
						.body(Collections.singletonMap("error", e.getMessage()));
				
			}
			
			return ResponseEntity
					.status(500)
					.body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
	}
}
