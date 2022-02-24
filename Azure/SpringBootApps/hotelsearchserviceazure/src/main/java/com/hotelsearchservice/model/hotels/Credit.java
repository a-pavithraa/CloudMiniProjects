package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class Credit implements Serializable{
	  private double reward_amount;
	    private String terms_conditions;
	    private String reward_currency;
}
