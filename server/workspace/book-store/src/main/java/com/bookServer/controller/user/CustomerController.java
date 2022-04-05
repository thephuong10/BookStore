package com.bookServer.controller.user;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.bookServer.constant.MessageConstant;
import com.bookServer.dto.CartDTO;
import com.bookServer.dto.CustomerDTO;
import com.bookServer.entity.AddressEntity;
import com.bookServer.entity.BookEntity;
import com.bookServer.entity.UserEntity;
import com.bookServer.exception.EntityNotFoundException;
import com.bookServer.payload.ShippingOrderResponse;
import com.bookServer.payload.SignInRequest;
import com.bookServer.security.TokenProvider;
import com.bookServer.security.UserPrincipal;
import com.bookServer.service.IBookService;
import com.bookServer.service.ICartService;
import com.bookServer.service.IOrderService;
import com.bookServer.service.IUserService;
import com.bookServer.utils.FuncitionUtils;
import com.bookServer.utils.MapValueResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@PropertySource(value = "classpath:properties.properties")
public class CustomerController {
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private IUserService iuserService;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private IOrderService iorderService;
	
	@Autowired 
	private ICartService icartService;
	
	@Autowired
	private IBookService ibookService;
	
	@Value("${ghn.token}")
	private String token;

	@Value("${ghn.shopId}")
	private String shopId;
	
	private final Integer from_district = 1449;
	
	@PostMapping("/api/customer/signin")
	public ResponseEntity<?> signin(@Valid @RequestBody SignInRequest payload) {

		try {

			// System.out.println(passwordEncoder.encode("customer12345"));

			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(payload.getEmail(), payload.getPassword()));

			SecurityContextHolder.getContext().setAuthentication(authentication);

			UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

			UserEntity entity = iuserService.findOneById((long) user.getId());

			iuserService.update(entity);

			String token = tokenProvider.createToken(user.getId());

			return ResponseEntity.ok(Collections.singletonMap("token", token));

		} catch (Exception e) {

			e.printStackTrace();

			return ResponseEntity.status(400)
					.body(Collections.singletonMap("message", "Tài khoản hoặc mật khẩu không tồn tại"));

		}

	}
	
	@GetMapping("/auth/api/customer/info")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserPrincipal user){
		
		try {
			
			
			return ResponseEntity
					.ok(MapValueResponse
						    .getInstance()
							.put("info",iuserService.findOneCustomerById(user.getUserDetailId()))
							.put("totalCart",icartService.getTotalCartsByCustomerId(
									user.getUserDetailId()))
							.getAndReset());
			
		} catch (EntityNotFoundException e) {
				
			return ResponseEntity
					.status(400)
					.body(e.getMessage());
		}
		
	}
		
	@PutMapping("/auth/api/customer/update/address")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<?> updateAddress(@AuthenticationPrincipal UserPrincipal user,
				@RequestParam(name = "phone") String phone,
				@RequestBody AddressEntity address
			){
		
		try {
			
			
			UserEntity userEntity = iuserService.findOneById(user.getId());
			
			userEntity.setPhone(phone);
			
			if(userEntity.getAddress() != null) {
				
				userEntity.setAddress((AddressEntity) FuncitionUtils.mergeEntity(address, userEntity.getAddress(), ""));
				
			} else {
				
				userEntity.setAddress(address);
				
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
	
	
	@PostMapping("/auth/api/customer/order/create")
	public ResponseEntity<?> order(@AuthenticationPrincipal UserPrincipal user,
			@RequestParam(name = "feeShipping") BigDecimal feeShipping) {
		
		
		
		try {
			
			if(iorderService.create(user.getUserDetailId(), feeShipping)) {
				
				for (CartDTO cart : icartService.getAllByCustomerId(user.getUserDetailId())) {
					
					BookEntity book = ibookService.getById(cart.getBook().getId());
					
					book.setTotal(book.getTotal() - cart.getTotal());
					
					ibookService.update(book);
					
					icartService.delete(cart.getId());
				}
				
				
				
				return ResponseEntity
						.ok(MessageConstant.Response.SC_OK);
				
			}
			
			return ResponseEntity
					.status(400)
					.body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return ResponseEntity
					.status(400)
					.body(e.getMessage());
		}
		
		
	
	}

	
	@GetMapping("/auth/api/fee/shipping")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<?> getFeeShipping(@AuthenticationPrincipal UserPrincipal user) {

		HttpHeaders headers = new HttpHeaders();

		headers.set("token", token);

		headers.setContentType(MediaType.APPLICATION_JSON);

		try {
			
			CustomerDTO customer = iuserService
					.findOneCustomerById(user.getUserDetailId());
			
			if(customer.getUser().getAddress() != null) {
				
				Map<String, Object>map=new HashMap<>();
				
				
				map.put("shop_id", Integer.parseInt(shopId));
				map.put("from_district", from_district);
				map.put("to_district", customer.getUser().getAddress().getDistrictId());
				
				String json = objectMapper.writeValueAsString(map);
				
				HttpEntity<String> http = new HttpEntity<>(json,headers);
				
				ResponseEntity<String> services = restTemplate
						.postForEntity("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
								http, String.class);
				
				ShippingOrderResponse resultServices = objectMapper
						.readValue(services.getBody(), ShippingOrderResponse.class);
				
				if(resultServices != null) {
					
					Integer serviceId = resultServices.getData().get(0).getService_id();
					
					map=new HashMap<>();
					map.put("insurance_value", 50000);
					map.put("coupon", null);
					map.put("from_district_id", from_district);
					map.put("to_district_id", customer.getUser().getAddress().getDistrictId());
					map.put("to_ward_code", customer.getUser().getAddress().getWardCode());
					map.put("service_id", serviceId);
					map.put("height", 24);
					map.put("weight", 100);
					map.put("width", 24);
					
					json = objectMapper.writeValueAsString(map);
					
					http = new HttpEntity<>(json,headers);
					
					return restTemplate
							.postForEntity(
									"https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
									http, String.class);
				}

				
			}

			
			

			return ResponseEntity.status(400).body("Chưa tồn tại địa chỉ");

		} catch (Exception e) {
			
			e.printStackTrace();

			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/auth/api/customer/order/get/all")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<?> getAll(@AuthenticationPrincipal UserPrincipal user) {

		return ResponseEntity
				.ok(iorderService.getAllByCustomerId(user.getUserDetailId()));
	}
	
	@PatchMapping("/auth/api/customer/order/cacel")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<?> updateStatus(@RequestParam(name = "id") Long id
			                     ,@RequestParam(name = "reasonCancel") String reasonCancel) {

		try {

			return ResponseEntity.status(200).body(iorderService.cancelOrder(id, reasonCancel));

		} catch (Exception e) {
			
			return ResponseEntity
					.status(400)
					.body(Collections.singletonMap("message", e.getMessage()));
		}
	}
	

}
