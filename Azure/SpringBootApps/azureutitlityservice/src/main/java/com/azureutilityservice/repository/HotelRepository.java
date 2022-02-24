package com.azureutilityservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.azureutitlityservice.model.BookmarkedHotels;
import com.azureutitlityservice.model.HotelDetails;




public interface HotelRepository extends MongoRepository<BookmarkedHotels, String>{
	
	
	public BookmarkedHotels findByUsername(String userName);

}
