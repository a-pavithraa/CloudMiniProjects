package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

public class Item implements Serializable{
	
	private String name;
    private ItemAmount item_amount;
    private String kind;
    private String details;
    private Base base;
    private String inclusion_type;
    private String identifier;

}
