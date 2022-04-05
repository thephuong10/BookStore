package com.bookServer.controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.bookServer.constant.MessageConstant;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/address")
@PropertySource(value = "classpath:properties.properties")
public class AddressController {

	@Value("${ghn.token}")
	private String token;

	@Value("${ghn.shopId}")
	private String shopId;

	private final String FETCH_ADDRESS_URL = "https://online-gateway.ghn.vn/shiip/public-api/master-data";

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private ObjectMapper objectMapper;
	
	

	@GetMapping("/province")
	public ResponseEntity<?> getProvinces() {

		HttpHeaders headers = new HttpHeaders();

		headers.set("token", token);

		HttpEntity<String> http = new HttpEntity<>(headers);

		try {

			return restTemplate.exchange(FETCH_ADDRESS_URL + "/province", HttpMethod.GET, http, String.class);

		} catch (Exception e) {

			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/district/{provinceId}")
	public ResponseEntity<?> getDistricts(@PathVariable(name = "provinceId") Integer provinceId) {

		HttpHeaders headers = new HttpHeaders();

		headers.set("token", token);

		headers.setContentType(MediaType.APPLICATION_JSON);

		try {

			String json = objectMapper.writeValueAsString(Collections.singletonMap("province_id", provinceId));

			

			HttpEntity<String> http = new HttpEntity<>(json, headers);

			return restTemplate.postForEntity(FETCH_ADDRESS_URL + "/district", http, String.class);

		} catch (Exception e) {

			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/ward/{districtId}")
	public ResponseEntity<?> getWards(@PathVariable(name = "districtId") Integer districtId) {

		HttpHeaders headers = new HttpHeaders();

		headers.set("token", token);

		headers.setContentType(MediaType.APPLICATION_JSON);

		try {

			String json = objectMapper.writeValueAsString(Collections.singletonMap("district_id", districtId));

			HttpEntity<String> http = new HttpEntity<>(json, headers);

			return restTemplate.postForEntity(FETCH_ADDRESS_URL + "/ward", http, String.class);

		} catch (Exception e) {

			return ResponseEntity.status(500).body(MessageConstant.Response.SC_INTERNAL_SERVER_ERROR);
		}
	}

	



}
