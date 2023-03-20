package com.example.demo.Config;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf()
                .disable()
                .cors()
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/auth/**", "/books", "/books/**", "/auth/logout")
                .permitAll()
                .requestMatchers(HttpMethod.GET, "/users", "/borrow", "/borrow/book/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/books", "/users/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.POST, "/books").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.POST, "/borrow").hasAnyAuthority("USER","ADMIN")
                .requestMatchers(HttpMethod.PUT, "/borrow").hasAnyAuthority("USER","ADMIN")
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                .logoutUrl("/auth/logout")
                .logoutSuccessHandler((request, response, authentication) -> {
                    SecurityContextHolder.clearContext();
                    response.setStatus(HttpServletResponse.SC_OK);
                })
                .addLogoutHandler(logoutHandler)
                .permitAll());



        return http.build();
    }
}
