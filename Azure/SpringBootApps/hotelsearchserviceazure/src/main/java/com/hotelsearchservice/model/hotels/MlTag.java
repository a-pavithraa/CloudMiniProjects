package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class MlTag  implements Serializable{
	 private int confidence;
	 private String tag_name;
	 private int tag_id;
	 private String tag_type;
	 private int photo_id;

}
