package com.hotelsearchservice.model.hotels;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class Hotels implements Serializable{
	
	private int primary_count;
    private int count;
    private List<RoomDistribution> room_distribution;
    private MapBoundingBox map_bounding_box;
    private int total_count_with_filters;
    private int unfiltered_count;
    private int extended_count;
    private int unfiltered_primary_count;
    private double search_radius;
    private List<Sort> sort;
    private List<Result> result;

}
