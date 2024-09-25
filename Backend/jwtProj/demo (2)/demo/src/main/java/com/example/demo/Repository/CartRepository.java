package com.example.demo.Repository;

import com.example.demo.Entity.Cart;
import com.example.demo.Entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUser(UserInfo user);
}

