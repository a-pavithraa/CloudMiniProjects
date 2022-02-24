package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;


@Data
public class ReviewPhoto implements Serializable{
	
	private String url_square60;
	private String url_640x200;
	private String url_max300;
	private int photo_id;
	private String url_original;
	private double ratio;

}
