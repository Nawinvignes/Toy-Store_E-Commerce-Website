package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

// import com.example.demo.Entity.User;
import com.example.demo.Entity.UserInfo;


import java.util.List;
import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByName(String username);
    List<UserInfo> findAll();
    Optional<UserInfo> findByEmail(String email);
    List<UserInfo> findByRoles(String roles);
}