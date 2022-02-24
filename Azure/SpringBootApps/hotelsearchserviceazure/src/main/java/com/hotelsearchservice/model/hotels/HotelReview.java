package com.hotelsearchservice.model.hotels;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class HotelReview implements Serializable {
	
	 private int count;
	 private List<ReviewDetails> result;
	 private List<Object> sort_options;

}
