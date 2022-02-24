package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class SumCredits implements Serializable{
	 private double reward_amount;
	    private String reward_currency;
}
