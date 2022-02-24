package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class Checkin implements Serializable {
	 private String until;
	    private String from;

}
