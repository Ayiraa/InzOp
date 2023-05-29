package com.example.demo.Controller;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        System.out.println("TEST");
        return userRepository.findAll();

    }

    @PostMapping("/users")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        // Check if email already exists in the database
        if (userRepository.existsByEmail(user.getEmail())) {
            // Return a response with an error message
            String errorMessage = "Email already exists";
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
        }
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    // Delete user by id
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {

        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Get user by id
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }


}

