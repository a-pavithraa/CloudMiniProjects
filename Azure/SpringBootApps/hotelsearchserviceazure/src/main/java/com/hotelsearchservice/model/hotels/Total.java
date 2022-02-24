package com.hotelsearchservice.model.hotels;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class Total implements Serializable{
	  private List<Credit> credits;
	    private SumCredits sum_credits;

}
