package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class PriceBreakdown implements Serializable{
	
	 private String currency;
	    private double all_inclusive_price;
	    private int has_tax_exceptions;
	    private int has_incalculable_charges;
	    private int has_fine_print_charges;
	    private String sum_excluded_raw;
	    private Object gross_price;

}
