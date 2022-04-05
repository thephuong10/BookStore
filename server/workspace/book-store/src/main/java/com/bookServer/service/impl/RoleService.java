package com.bookServer.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookServer.entity.RoleEntity;
import com.bookServer.exception.EntityNotFoundException;
import com.bookServer.repository.IRoleRepository;
import com.bookServer.service.IRoleService;

@Service
public class RoleService implements IRoleService {
	
	@Autowired
	private IRoleRepository iroleRepository;
	
	@Override
	public RoleEntity findOneByCode(String code) {
		
		return iroleRepository
				.findOneByCode(code)
				.orElseThrow(()-> new EntityNotFoundException("Role"));
	}

}
