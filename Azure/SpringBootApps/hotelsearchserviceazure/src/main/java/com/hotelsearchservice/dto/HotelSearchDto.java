package com.hotelsearchservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class HotelSearchDto {

	private String units;
	@JsonProperty("order_by")
	private String orderBy;
	@JsonProperty("order_by")
	private String checkoutDate;
	@JsonProperty("adults_number")
	private String adultsNumber;
	@JsonProperty("checkin_date")
	private String checkinDate;
	@JsonProperty("room_number")
	private int roomNumber;
	@JsonProperty("filter_by_currency")
	private String filterByCurrency;
	@JsonProperty("dest_type")
	private String destType;
	@JsonProperty("locale")
	private String locale;
	@JsonProperty("dest_id")
	private int destId;
	@JsonProperty("include_adjacency")
	private boolean includeAdjacency;
	@JsonProperty("page_number")
	private int pageNumber;
	@JsonProperty("children_number")
	private int childNumber;
	@JsonProperty("children_ages")
	private String childrenAges;
	
	
	

}
