//
//
//package com.project.api_gateway.config;
//
//import org.springframework.cloud.gateway.filter.GatewayFilter;
//import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
//import org.springframework.core.annotation.Order;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.server.reactive.ServerHttpRequest;
//import org.springframework.http.server.reactive.ServerHttpResponse;
//import org.springframework.stereotype.Component;
//import reactor.core.publisher.Mono;
//
//@Component
//public class MyCorsFilterConfig extends AbstractGatewayFilterFactory<MyCorsFilterConfig.Config> {
//
//	 private static final String ALLOWED_ORIGIN = "http://localhost:5173";
//	 
//	public MyCorsFilterConfig() {
//		super(Config.class);
//	}
//	public static class Config {
//
//	}
//	
//    @Override
//    public GatewayFilter apply(Config config) {
//        return (exchange, chain) -> {
//            ServerHttpRequest request = exchange.getRequest();
//            ServerHttpResponse response = exchange.getResponse();
//
//            // Add CORS headers to the response
//            response.getHeaders().add(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, ALLOWED_ORIGIN);
//            response.getHeaders().add(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "POST, PUT, GET, OPTIONS, DELETE");
//            response.getHeaders().add(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "Authorization, Content-Type, enctype");
//            response.getHeaders().add(HttpHeaders.ACCESS_CONTROL_MAX_AGE, "3600");
//            response.getHeaders().add(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true");
//
//            // Handle pre-flight (OPTIONS) requests
//            if (HttpMethod.OPTIONS.equals(request.getMethod())) {
//                response.setStatusCode(HttpStatus.OK);
//                return Mono.empty();
//            }
//
//            return chain.filter(exchange);
//        };
//    }
//
//
//
//}
