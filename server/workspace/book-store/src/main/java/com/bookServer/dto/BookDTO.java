package com.bookServer.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.bookServer.model.File;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BookDTO extends BaseDTO {

	private BigDecimal price;
	
	private BigDecimal priceOriginal;
	
	private List<String>images;

	private Long total;

	private Long pages;

	private Integer width;

	private Integer height;

	private Double weight;
	
	private Date publicYear;
	
	private String type;
	
	private Date modifiedDate;
	
	private Long modifiedBy;
	
	private Long selled;
	
	private String description;
	
	private List<CategoryDTO>categories;
	
	private AuthorDTO author;
	
	private PublicCompanyDTO publicCompany;
	
	private Double discount;
	
	private AdminDTO admin;
	
	private RatingDTO rating;
	
	private List<File>files;
	
//    {
//      ratingAverage:4.4,
//      ratings:[13,6,14,24,136]
//    }
	

}
