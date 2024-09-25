package com.example.demo.Service;

import com.example.demo.Entity.UserInfo;
import com.example.demo.Repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserInfoService {
    @Autowired
    private UserInfoRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserInfo> getAllUsers() {
        return userRepository.findAll();
    }

    public void updateUser(UserInfo user) {
        System.out.println(user);
        // Encrypt the user's password if it's updated
        // if (user.getPassword() != null && !user.getPassword().isEmpty()) {
        //     user.setPassword(passwordEncoder.encode(user.getPassword()));
        // }
        userRepository.save(user);
    }

    public Optional<UserInfo> getUserById(long id) {
        return userRepository.findById(id);
    }

    public Optional<UserInfo> getByName(String username){
        return Optional.ofNullable(userRepository.findByName(username).orElse(null));
    }

    public Optional<UserInfo> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserInfo saveUser(UserInfo user) {
        // Encrypt the user's password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}