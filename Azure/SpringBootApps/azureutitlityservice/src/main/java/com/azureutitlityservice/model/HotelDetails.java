package com.azureutitlityservice.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class HotelDetails implements Serializable{
	private String maxPhotoUrl;
	private String hotelName;
	private String cityName;
	private String country;
	private String distance;
	private String review;
	private double price;
	private int hotelId;

}
