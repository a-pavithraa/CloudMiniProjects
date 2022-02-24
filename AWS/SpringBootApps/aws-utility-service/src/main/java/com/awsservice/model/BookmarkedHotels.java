package com.awsservice.model;

import java.util.List;



import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

@DynamoDbBean
public class BookmarkedHotels {

	@DynamoDbPartitionKey
    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
    private String username;
   
    private List<HotelDetails> hotelsList;
    
    

    public List<HotelDetails> getHotelsList() {
		return hotelsList;
	}

	public void setHotelsList(List<HotelDetails> hotelsList) {
		this.hotelsList = hotelsList;
	}

	public BookmarkedHotels()
    {
    }

   
}