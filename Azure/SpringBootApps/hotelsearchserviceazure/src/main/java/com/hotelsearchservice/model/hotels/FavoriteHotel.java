package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class FavoriteHotel implements Serializable {
	private String maxPhotoUrl;
	private String hotelName;
	private String cityName;
	private String country;
	private String distance;
	private String review;
	private double price;
	private int hotelId;

}
