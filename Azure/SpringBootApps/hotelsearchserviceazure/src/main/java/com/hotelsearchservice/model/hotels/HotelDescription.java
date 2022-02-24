package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class HotelDescription implements Serializable{
	 private int descriptiontype_id;
	 private String languagecode;
	 private String description;
	 private ExtraLinesDescription extra_lines;

}
