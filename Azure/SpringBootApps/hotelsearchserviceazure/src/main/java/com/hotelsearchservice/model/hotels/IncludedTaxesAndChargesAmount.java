package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class IncludedTaxesAndChargesAmount implements Serializable{
	  private String currency;
	    private double value;

}
