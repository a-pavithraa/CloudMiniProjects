package com.hotelsearchservice.model.location;

import lombok.Data;

@Data
public class BMaxLosData {
	private int is_fullon;
	private int default_los;
	private String experiment;
    private int max_allowed_los;
    private int has_extended_los;
    private String extended_los;
}
