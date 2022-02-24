package com.azureutilityservice;

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


import com.azureutilityservice.repository.HotelRepository;
import com.azureutitlityservice.model.BookmarkedHotels;
import com.azureutitlityservice.model.HotelDetails;




@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UtitlityController {
	
	private Logger logger = LoggerFactory.getLogger(UtitlityController.class);
	@Autowired
	private HotelRepository bookmarkHotelRepository;
	
	@GetMapping("/")
	public String healthCheckEndPoint() {
		return "Healthy";
	}

	@GetMapping("/FavoriteHotels")
	public List<HotelDetails> getHotels(String userName) {
		
		logger.info("Inside get hotels");
	
		BookmarkedHotels hotels = bookmarkHotelRepository.findByUsername(userName);
		if(hotels!=null) {
			logger.info(hotels.toString());
			return hotels.getHotelsList();
		}
		return null;
		
	
	}
	
	
	@PostMapping("/FavoriteHotels")
	public List<HotelDetails> postHotelDetails(String userName,@RequestBody HotelDetails hotelDetails) {
	
		logger.info("Inside post hotels");
		logger.info(hotelDetails.toString());
		BookmarkedHotels hotels = bookmarkHotelRepository.findByUsername(userName);
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
		bookmarkHotelRepository.save(hotels);
			
		return hotels.getHotelsList();
		
	
	}

}
