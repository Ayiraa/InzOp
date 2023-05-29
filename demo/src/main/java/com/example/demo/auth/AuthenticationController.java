package com.example.demo.auth;

import com.example.demo.Repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final UserRepository userRepository;

//    @PostMapping("/register")
//    @CrossOrigin(origins = "*", maxAge = 3600)
//    public ResponseEntity<AuthenticationResponse> register
//            (@RequestBody RegisterRequest request){
//        return ResponseEntity.ok(service.register(request));
//    }
@PostMapping("/register")
@CrossOrigin(origins = "*", maxAge = 3600)
public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
        // Handle validation errors and return appropriate response
        String errorMessage = bindingResult.getFieldError().getDefaultMessage();
        return ResponseEntity.badRequest().body(errorMessage);
    }

    // Check if email already exists in the database
    if (userRepository.existsByEmail(request.getEmail())) {
        String errorMessage = "Email already exists";
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
    }

    return ResponseEntity.ok(service.register(request));
}

    @PostMapping("/login")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<AuthenticationResponse> authenticate
            (@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }
}
