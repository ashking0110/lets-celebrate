package com.example.lets_celebrate.controller;

import com.example.lets_celebrate.entity.User;
import com.example.lets_celebrate.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        return ResponseEntity.ok(userService.signup(user));
    }
    
    // Placeholder login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        return userService.login(user.getEmail(), user.getPasswordHash())
                .map(u -> ResponseEntity.ok("token_for_" + u.getUserId()))
                .orElse(ResponseEntity.status(401).build());
    }
    
    @GetMapping("/{userId}/profile")
    public ResponseEntity<User> getProfile(@PathVariable Long userId) {
        return userService.getProfile(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
