package com.ey.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF since we are using stateless JWT tokens
            .csrf(csrf -> csrf.disable())

            // No default session management; stateless JWT
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Define URL-based authorization
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()                       // Login/Register endpoints
                .requestMatchers("/api/books/**").hasAnyRole("ADMIN", "SELLER")
                .requestMatchers("/api/customers/**").hasRole("ADMIN")
                .requestMatchers("/api/transactions/**").hasAnyRole("BUYER", "ADMIN")
                .anyRequest().authenticated()                                   // All other endpoints require authentication
            )

            // Disable default login forms and HTTP basic auth
            .httpBasic(httpBasic -> httpBasic.disable())
            .formLogin(formLogin -> formLogin.disable())

            // Add your JWT filter before Spring Security's default authentication
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Password encoder for hashing user passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public UserDetailsService userDetailsService() {
        // Return a no-op UserDetailsService to prevent Spring from creating a default user
        return username -> null;
    }
}
