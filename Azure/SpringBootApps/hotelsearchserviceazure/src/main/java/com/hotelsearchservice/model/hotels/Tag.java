package com.hotelsearchservice.model.hotels;

import java.io.Serializable;

import lombok.Data;

@Data
public class Tag  implements Serializable {
	private int id;
	private String tag;

}
