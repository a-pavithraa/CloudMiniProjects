package com.awsservice.model;

import java.io.Serializable;



import lombok.Data;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@Data
@DynamoDbBean
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
