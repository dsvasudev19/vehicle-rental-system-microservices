package com.project.authentication_service.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
    	 CorsConfiguration corsConfig = new CorsConfiguration();
         corsConfig.addAllowedOrigin("http://localhost:5173"); // Allow the frontend origin
         corsConfig.addAllowedMethod("*"); // Allow all HTTP methods (GET, POST, etc.)
         corsConfig.addAllowedHeader("*"); // Allow all headers
         corsConfig.setAllowCredentials(true); // Allow credentials (cookies)
         corsConfig.addExposedHeader("Authorization"); // Expose custom headers if needed

         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
         source.registerCorsConfiguration("/**", corsConfig); // Apply CORS settings to all paths

         return new CorsWebFilter(source);
    }
}