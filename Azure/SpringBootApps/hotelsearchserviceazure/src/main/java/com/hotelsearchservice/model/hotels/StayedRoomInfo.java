package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class StayedRoomInfo implements Serializable{
	
	  private int room_id;
	  private String checkin;
	  private String room_name;
	  private ReviewPhoto photo;
	  private String checkout;

}
