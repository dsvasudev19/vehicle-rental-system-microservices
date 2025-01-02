package com.project.payment_service.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Component
public class RazorpayInstance {
	
	private static final String KEY="rzp_test_alc9PznICVvKQb";
	
	private static final String SECRET="gTDe32iZF7V5K9e3vvL3G663";
	
	@Bean
	public RazorpayClient razoyClient() throws RazorpayException {
		
		return new RazorpayClient(KEY, SECRET);
	}

}
