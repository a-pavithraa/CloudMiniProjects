package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class Badge implements Serializable{
	
	 private String id;
	    private String badge_variant;
	    private String text;

}
