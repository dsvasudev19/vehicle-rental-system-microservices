package com.project.api_gateway.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.elasticsearch.ElasticsearchProperties.Restclient;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

	@Autowired
	RouteValidator validator;

	public AuthenticationFilter() {
		super(Config.class);
	}

	public static class Config {

	}

	@Override
	public GatewayFilter apply(Config config) {
		return ((exchange, chain) -> {
			if (validator.isSecured.test(exchange.getRequest())) {
				if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					// Both ways of sending response, Either we can Throw run time exception or else
					// we
					// can respond with unauthorized
//					throw new RuntimeException("MISSING AUTHORIZATION TOKEN");
					exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
					return exchange.getResponse().setComplete();
				}
				String authHeaderToken = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
				if (authHeaderToken != null && authHeaderToken.startsWith("Bearer")) {
					authHeaderToken = authHeaderToken.substring(7);
				} else {
					exchange.getResponse().setStatusCode(HttpStatusCode.valueOf(403));
					return exchange.getResponse().setComplete();
				}

				try {
					RestClient restClient = RestClient.create();
					boolean isValidToken = restClient.get()
							.uri("http://localhost:9099/auth/validate/token?token=" + authHeaderToken).retrieve()
							.body(Boolean.class);
				} catch (Exception e) {
					exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
					return exchange.getResponse().setComplete();
				}
			}
			return chain.filter(exchange);
		});
	}
}