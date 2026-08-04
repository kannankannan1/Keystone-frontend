package com.fieldservicemanagement.field_service_management.controller;

import com.fieldservicemanagement.field_service_management.entity.UserProfile;
import com.fieldservicemanagement.field_service_management.entity.Users;
import com.fieldservicemanagement.field_service_management.repository.UserProfileRepository;
import com.fieldservicemanagement.field_service_management.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final UserProfileRepository userProfileRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthController(UserService userService, UserProfileRepository userProfileRepository) {
        this.userService = userService;
        this.userProfileRepository = userProfileRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        Optional<Users> userOpt = userService.getByEmail(email);
        if (userOpt.isPresent() && passwordMatches(password, userOpt.get().getPasswordHash())) {
            Users user = sanitize(userOpt.get());
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("accessToken", "mock-token-" + user.getId());
            response.put("refreshToken", "mock-refresh-" + user.getId());
            return ResponseEntity.ok(response);
        }
        Map<String, Object> error = new HashMap<>();
        error.put("error", "Invalid credentials");
        return ResponseEntity.status(401).body(error);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String firstName = body.get("firstName");
        String lastName = body.get("lastName");
        String phone = body.get("phone");
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));
        }
        if (firstName == null || firstName.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "First name is required"));
        }
        if (userService.getByEmail(email).isPresent()) {
            return ResponseEntity.status(409).body(Map.of("error", "An account with this email already exists"));
        }
        Users user = Users.builder()
                .firstName(firstName)
                .lastName(lastName == null ? "" : lastName)
                .email(email.toLowerCase())
                .role("customer")
                .passwordHash(passwordEncoder.encode(password))
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        Users saved = userService.create(user);

        UserProfile profile = UserProfile.builder()
                .user(saved)
                .phone(phone)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        userProfileRepository.save(profile);

        Map<String, Object> response = new HashMap<>();
        response.put("user", sanitize(saved));
        response.put("accessToken", "mock-token-" + saved.getId());
        response.put("refreshToken", "mock-refresh-" + saved.getId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(Map.of("message", "Password reset link sent"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser() {
        Users user = sanitize(userService.getById(1L));
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    private boolean passwordMatches(String raw, String stored) {
        if (raw == null || stored == null) {
            return false;
        }
        if (stored.startsWith("$2")) {
            return passwordEncoder.matches(raw, stored);
        }
        return stored.equals(raw);
    }

    private Users sanitize(Users user) {
        user.setPasswordHash(null);
        return user;
    }
}
