package com.hotelsearchservice.model.hotels;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class RoomDistribution implements Serializable{
	 private String adults;
	    private List<Integer> children;
}
