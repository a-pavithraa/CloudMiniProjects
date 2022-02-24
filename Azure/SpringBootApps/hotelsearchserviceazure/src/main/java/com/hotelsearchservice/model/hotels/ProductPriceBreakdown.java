package com.hotelsearchservice.model.hotels;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class ProductPriceBreakdown implements Serializable{
	 private GrossAmount gross_amount;
	    private IncludedTaxesAndChargesAmount included_taxes_and_charges_amount;
	    private List<Item> items;
	    private NetAmount net_amount;
	    private List<Benefit> benefits;
	    private GrossAmountPerNight gross_amount_per_night;
	    private ExcludedAmount excluded_amount;
	    private AllInclusiveAmount all_inclusive_amount;
	    private RewardAmount reward_amount;
	    private DiscountedAmount discounted_amount;
	    private StrikethroughAmountPerNight strikethrough_amount_per_night;
	    private StrikethroughAmount strikethrough_amount;

}
