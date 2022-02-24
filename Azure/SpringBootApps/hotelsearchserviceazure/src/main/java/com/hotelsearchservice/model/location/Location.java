package com.hotelsearchservice.model.location;

import lombok.Data;

@Data
public class Location {
	
	 private String lc;
	    private String image_url;
	    private String city_name;
	    private String dest_id;
	    private int landmark_type;
	    private String label;
	    private int city_ufi;
	    private double longitude;
	    private String country;
	    private String dest_type;
	    private String cc1;
	    private double latitude;
	    private int rtl;
	    private String type;
	    private String timezone;
	    private String region;
	    private int hotels;
	    private BMaxLosData b_max_los_data;
	    private String name;
	    private int nr_hotels;

}
