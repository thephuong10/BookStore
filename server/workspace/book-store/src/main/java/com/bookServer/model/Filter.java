package com.bookServer.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Filter {
	
	private String key;
    private String type;
    private String value;
    private String attr;
}
