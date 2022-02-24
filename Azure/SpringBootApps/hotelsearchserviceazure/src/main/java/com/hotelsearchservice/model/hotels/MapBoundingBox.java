package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class MapBoundingBox implements Serializable{
	
	private double sw_lat;
    private double ne_lat;
    private double ne_long;
    private double sw_long;

}
