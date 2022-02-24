package com.hotelsearchservice.model.hotels;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class HotelPhotos implements Serializable{
	
	public int descriptiontype_id;
    public List<MlTag> ml_tags;
    public int photo_id;
    public List<Tag> tags;
    public String url_square60;
    public String url_max;
    public String url_1440;

}
