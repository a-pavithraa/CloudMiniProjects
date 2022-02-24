package com.hotelsearchservice.model.hotels;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class Rewards implements Serializable{
	
	  private List<Block> blocks;
	    private Total total;

}
