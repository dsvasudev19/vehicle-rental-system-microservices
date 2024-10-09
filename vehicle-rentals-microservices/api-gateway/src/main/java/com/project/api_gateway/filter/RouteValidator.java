package com.project.api_gateway.filter;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class RouteValidator {
	
	public static final List<String> OPENROUTES=List.of("/auth/user/register","/auth/user/validate","/auth/validate/token");
	
	public Predicate<ServerHttpRequest> isSecured=request->OPENROUTES.stream().noneMatch(route->request.getURI().getPath().contains(route));

}
