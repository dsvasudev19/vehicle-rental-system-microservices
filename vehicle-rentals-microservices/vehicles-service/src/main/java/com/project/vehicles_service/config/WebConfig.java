package com.project.vehicles_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.vehicles_service.ipc.BookingClient;

import lombok.SneakyThrows;

@Configuration
public class WebConfig {
	@Bean
	public WebClient webClient(ObjectMapper objectMapper) {
		return WebClient.builder().baseUrl("http://api-gateway:9000/").build();
	}

	@SneakyThrows
	@Bean
	BookingClient postClient(WebClient webClient) {
		HttpServiceProxyFactory httpServiceProxyFactory = HttpServiceProxyFactory
				.builderFor(WebClientAdapter.create(webClient)).build();
		return httpServiceProxyFactory.createClient(BookingClient.class);
	}

}
