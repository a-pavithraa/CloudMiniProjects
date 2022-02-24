package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class Distance implements Serializable{
	
	private String icon_name;
    private Object icon_set;
    private String text;

}
