package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class ReviewerPhoto implements Serializable{
	
	private String max1280x900;
	private String square90;
	private String square60_ao;
	private String max500_ao;

}
