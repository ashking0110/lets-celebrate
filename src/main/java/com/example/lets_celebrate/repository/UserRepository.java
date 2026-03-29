package com.example.lets_celebrate.repository;

import com.example.lets_celebrate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
