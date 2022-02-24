package com.hotelsearchservice;

import java.net.http.HttpHeaders;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import feign.FeignException.InternalServerError;

@ControllerAdvice
public class ExceptionHandler extends ResponseEntityExceptionHandler {
	
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status, WebRequest request) {
       
        return new ResponseEntity("Arguments not valid", HttpStatus.BAD_REQUEST);
    }
	protected ResponseEntity<Object> handleTooManyRequests(InternalServerError ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {

	return new ResponseEntity("Please try after sometime", HttpStatus.TOO_MANY_REQUESTS);
}

}
