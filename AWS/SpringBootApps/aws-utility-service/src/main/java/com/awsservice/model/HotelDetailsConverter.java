package com.awsservice.model;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.awsservice.UtitlityController;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class HotelDetailsConverter implements DynamoDBTypeConverter<String, List<HotelDetails>> {

	private Logger logger = LoggerFactory.getLogger(HotelDetailsConverter.class);
	@Override
    public String convert(List<HotelDetails> objects) {
        
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String objectsString = objectMapper.writeValueAsString(objects);
           
            return objectsString;
        } catch (JsonProcessingException e) {
        	logger.error(e.getMessage());
        }
        return null;
    }

    @Override
    public List<HotelDetails> unconvert(String jsonString) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            List<HotelDetails> hotelDetailsList = objectMapper.readValue(jsonString, new TypeReference<List<HotelDetails>>(){});
            return hotelDetailsList;
        } catch (JsonParseException e) {
        	logger.error(e.getMessage());
           
        } catch (JsonMappingException e) {
        	logger.error(e.getMessage());
        } catch (IOException e) {
        	logger.error(e.getMessage());
        }
        return null;
    }
}
