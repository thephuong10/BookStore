package com.bookServer.service;

import com.bookServer.entity.RoleEntity;

public interface IRoleService {
	
  RoleEntity findOneByCode(String code);
  
}
