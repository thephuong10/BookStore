package com.bookServer.dto;

import java.sql.Date;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentDTO {
	
	private Long id;
	
	private String content;
	
	private Long parentId;
	
	private UserDTO user;
	
	
	private Date createDate;
	
	private Date modifiedDate;
	
	private List<CommentDTO>reply;
}
