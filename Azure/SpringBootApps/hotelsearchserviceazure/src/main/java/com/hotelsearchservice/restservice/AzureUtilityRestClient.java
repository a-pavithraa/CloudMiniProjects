package com.hotelsearchservice.restservice;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.hotelsearchservice.model.hotels.FavoriteHotel;

@FeignClient(name = "azureUtilityClient", url = "${api.azureUtilityUrl}")
public interface AzureUtilityRestClient {
	@GetMapping("/FavoriteHotels")
	public List<FavoriteHotel> getFavoriteHotels(@RequestParam String userName);
	
	@PostMapping("/FavoriteHotels")
	public void postFavoriteHotels(@RequestParam String userName,@RequestBody FavoriteHotel hotelDetails);

}
