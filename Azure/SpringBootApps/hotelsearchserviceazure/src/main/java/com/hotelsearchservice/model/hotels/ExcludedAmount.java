package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class ExcludedAmount implements Serializable{
	 private String currency;
	    private int value;
}
