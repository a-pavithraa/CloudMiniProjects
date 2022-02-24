package com.hotelsearchservice.model.hotels;

import java.io.Serializable;
import java.util.ArrayList;

import lombok.Data;

@Data
public class ReviewDetails implements Serializable{
	public double average_score;
    public int helpful_vote_count;
    public String anonymous;
    public Object review_id;
    public int is_moderated;
    public String review_hash;
    public String countrycode;
    public String pros_translated;
    public String title;
    public String languagecode;
    public String cons_translated;
    public String travel_purpose;
    public String hotelier_response;
    public ArrayList<Object> tags;
    public String date;
    public String title_translated;
    public ReviewAuthor author;
    public ArrayList<ReviewerPhoto> reviewer_photos;
    public StayedRoomInfo stayed_room_info;
    public ArrayList<Object> user_new_badges;
    public int hotel_id;
    public String pros;
    public String hotelier_name;
    public int reviewng;
    public String cons;
    public int is_incentivised;
    public int is_trivial;
	

}
