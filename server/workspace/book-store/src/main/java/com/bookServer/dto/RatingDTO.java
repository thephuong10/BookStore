package com.bookServer.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RatingDTO {
	
	private Long id;
	
	private List<Integer> ratingList;
	
	private Double ratingStar;
	
}
