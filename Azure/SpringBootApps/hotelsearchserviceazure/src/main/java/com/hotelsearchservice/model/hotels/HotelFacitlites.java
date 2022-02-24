package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class HotelFacitlites implements Serializable{
	private int hotelfacilitytype_id;
	private int is_common_room_facility;
	private String kind;
	private String facilitytype_name;
	private String facility_name;
	private String roomfacilitytype_id;
	private int facilitytype_id;
	private int value;
	private int hotel_id;
	private int paid;
	private int free;

}
