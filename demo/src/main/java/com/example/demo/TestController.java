package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/test")
    public String testConnection() {
        int count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM Users", Integer.class);
        return "Connection to Supabase database is successful. Table count: " + count;
    }
}
