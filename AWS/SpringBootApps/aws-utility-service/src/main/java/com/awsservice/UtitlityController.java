package com.awsservice;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.awsservice.config.DynamoDbEnhanced;
import com.awsservice.model.BookmarkedHotels;
import com.awsservice.model.HotelDetails;




@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UtitlityController {
	
	private Logger logger = LoggerFactory.getLogger(UtitlityController.class);
	@Autowired
	private DynamoDbEnhanced bookmarkedHotelsRepository;

	@GetMapping("/FavoriteHotels")
	public List<HotelDetails> getHotels(String userName) {
		
		logger.info("Inside get hotels");
	
		BookmarkedHotels hotels = bookmarkedHotelsRepository.getHotels(userName);
		if(hotels!=null)
			logger.info(hotels.toString());
		return hotels.getHotelsList();
		
	
	}
	
	
	@PostMapping("/FavoriteHotels")
	public List<HotelDetails> postHotelDetails(String userName,@RequestBody HotelDetails hotelDetails) {
	
		logger.info("Inside post hotels");
		logger.info(hotelDetails.toString());
		BookmarkedHotels hotels = bookmarkedHotelsRepository.getHotels(userName);
		logger.info(userName);
		if(hotels!=null)
		{
			logger.info(hotels.toString());
			List<HotelDetails> detailsList=hotels.getHotelsList();
			detailsList.add(hotelDetails);
			
		}
		else {
			hotels=new BookmarkedHotels();
			List<HotelDetails> detailsList=new ArrayList<>();
			detailsList.add(hotelDetails);
			hotels.setHotelsList(detailsList);
		}
		hotels.setUsername(userName);
		bookmarkedHotelsRepository.injectDynamoItem(hotels);
			
		return hotels.getHotelsList();
		
	
	}

}
