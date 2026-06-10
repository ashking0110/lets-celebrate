package com.example.lets_celebrate.controller;

import com.example.lets_celebrate.entity.User;
import com.example.lets_celebrate.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    record LoginResponse(String token, Long userId, String name, String email, String role) {}

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<LoginResponse> signup(@RequestBody User user) {
        User saved = userService.signup(user);
        return ResponseEntity.ok(toLoginResponse(saved));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {
        return userService.login(user.getEmail(), user.getPasswordHash())
                .map(u -> ResponseEntity.ok(toLoginResponse(u)))
                .orElse(ResponseEntity.status(401).build());
    }

    @GetMapping("/{userId}/profile")
    public ResponseEntity<User> getProfile(@PathVariable Long userId) {
        return userService.getProfile(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private LoginResponse toLoginResponse(User u) {
        return new LoginResponse("token_for_" + u.getUserId(), u.getUserId(), u.getName(), u.getEmail(), u.getRole());
    }
}
