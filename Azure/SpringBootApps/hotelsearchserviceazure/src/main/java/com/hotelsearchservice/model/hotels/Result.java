package com.hotelsearchservice.model.hotels;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Result implements Serializable{
	 private String id;
	    private double longitude;
	    private String countrycode;
	    private int hotel_has_vb_boost;
	    private double mobile_discount_percentage;
	    private int class_is_estimated;
	    private String distance_to_cc;
	    @JsonProperty("class") 
	    private double classNo;
	    private Bwallet bwallet;
	    private String address_trans;
	    private Object is_geo_rate;
	    private String city_trans;
	    private String unit_configuration_label;
	    private String city_name_en;
	    private String distance;
	    private Checkin checkin;
	    private int soldout;
	    private int is_genius_deal;
	    private String district;
	    private int cc_required;
	    private String main_photo_url;
	    private int is_wholesaler_candidate;
	    private String cc1;
	    private int price_is_final;
	    private String currencycode;
	    private int is_beach_front;
	    private int is_free_cancellable;
	    private int extended;
	    private String review_score_word;
	    private int accommodation_type;
	    private int children_not_allowed;
	    private String hotel_name_trans;
	    private int main_photo_id;
	    private int review_nr;
	    private String districts;
	    private int genius_discount_percentage;
	    private String native_ads_tracking;
	    private String zip;
	    private String type;
	    private List<Distance> distances;
	    private CompositePriceBreakdown composite_price_breakdown;
	    private int ufi;
	    private int preferred_plus;
	    private Object selected_review_topic;
	    private String hotel_name;
	    private String default_language;
	    private String url;
	    private List<String> block_ids;
	    private double native_ads_cpc;
	    private int hotel_include_breakfast;
	    private double latitude;
	    private int in_best_district;
	    private PriceBreakdown price_breakdown;
	    private String accommodation_type_name;
	    private Checkout checkout;
	    private String default_wishlist_name;
	    private double min_total_price;
	    private String country_trans;
	    private int preferred;
	    private int is_no_prepayment_block;
	    private String hotel_facilities;
	    private String review_recommendation;
	    private String currency_code;
	    private int wishlist_count;
	    private double review_score;
	    private String city;
	    private String address;
	    private int cant_book;
	    private int is_mobile_deal;
	    private String city_in_trans;
	    private String timezone;
	    private int is_smart_deal;
	    private int district_id;
	    private int hotel_id;
	    private List<Badge> badges;
	    private int is_city_center;
	    private String max_photo_url;
	    private String max_1440_photo_url;
	    private Rewards rewards;
	    private String ribbon_text;
	    private BookingHome booking_home;

}
