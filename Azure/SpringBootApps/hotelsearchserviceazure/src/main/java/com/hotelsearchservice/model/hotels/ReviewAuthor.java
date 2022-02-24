package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class ReviewAuthor implements Serializable{
	
	  private String type_string;
	    private String countrycode;
	    private int nr_reviews;
	    private String name;
	    private int user_id;
	    private String city;
	    private String type;
	    private String age_group;
	    private int helpful_vote_count;
	    private String avatar;

}
