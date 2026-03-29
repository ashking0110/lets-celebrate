package com.example.lets_celebrate.service;

import com.example.lets_celebrate.entity.User;
import com.example.lets_celebrate.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User signup(User user) {
        // Placeholder for actual password hashing logic
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        // Placeholder Auth logic
        return userRepository.findAll().stream()
                .filter(u -> u.getEmail().equals(email) && u.getPasswordHash().equals(password))
                .findFirst();
    }

    public Optional<User> getProfile(Long userId) {
        return userRepository.findById(userId);
    }
}
