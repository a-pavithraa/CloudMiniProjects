package com.hotelsearchservice.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private AzureADB2CJwtAuthFilter azureADB2CFilter;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.headers().cacheControl();
		http.csrf().disable()
		.authorizeRequests()
		.antMatchers("**/health").permitAll()	
		.antMatchers("/Hotel").permitAll()	
		.antMatchers("/").permitAll()	
		.antMatchers("/FavoriteHotels").authenticated()
		.and()
				.addFilterBefore(azureADB2CFilter, UsernamePasswordAuthenticationFilter.class);
		http.cors();
	}
	
	 @Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        final CorsConfiguration configuration = new CorsConfiguration();
	        configuration.setAllowedOrigins(List.of("*"));
	        configuration.setAllowedMethods(List.of("HEAD",
	                "GET", "POST", "PUT", "DELETE", "PATCH"));
	        configuration.setAllowCredentials(false);	
	        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
	        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", configuration);
	        return source;
	    }

}