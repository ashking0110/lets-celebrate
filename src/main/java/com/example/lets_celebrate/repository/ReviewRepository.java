package com.example.lets_celebrate.repository;

import com.example.lets_celebrate.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
