package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class StrikethroughAmountPerNight implements Serializable{
	 private double value;
	    private String currency;

}
