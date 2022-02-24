package com.azureutitlityservice.model;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class BookmarkedHotels {

	@Id
	public String id;
	private String username;

	private List<HotelDetails> hotelsList;

}
