package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class BookingHome implements Serializable {
	 private int is_booking_home;
	    private double quality_class;
	    private String group;
	    private int segment;
	    private String is_single_unit_property;

}
