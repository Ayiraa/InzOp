package com.example.demo.Controller;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
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
    public ResponseEntity<User> addUser(@RequestBody User user) {
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


}

