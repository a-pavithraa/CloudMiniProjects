package com.hotelsearchservice.restservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import feign.Retryer;
import static java.util.concurrent.TimeUnit.SECONDS;

import java.util.HashSet;
import java.util.Set;

import feign.RequestInterceptor;
import feign.codec.ErrorDecoder;


public class HotelBookingServiceFeignConfig {
	 @Value("${rapidapi.key}")
	 private String apiKey;
	 @Value("${rapidapi.service}")
	 private String service;
	
	 @Bean
	  public Retryer retryer() {
	    return new Retryer.Default(100, SECONDS.toMillis(1), 3);
	  }

	  @Bean
	  public RequestInterceptor feignRequestInterceptor() {
		  
	    return t -> t.header("x-rapidapi-key", apiKey).header("x-rapidapi-host", service);
	  }

	  @Bean
	  public ErrorDecoder errorDecoder() {
		
	    Set<Integer> retryableStatusCodes = new HashSet<>();
	    retryableStatusCodes.add(500);
	    retryableStatusCodes.add(503);
	    
	    return new FeignErrorDecoder(retryableStatusCodes);
	  }

}
