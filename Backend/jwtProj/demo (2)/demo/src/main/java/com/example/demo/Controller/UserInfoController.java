package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.UserInfo;
import com.example.demo.Service.JwtService;
import com.example.demo.Service.UserInfoService;
import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/userInfo")
public class UserInfoController {
    @Autowired
    private UserInfoService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/getUsers")
    public List<UserInfo> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/getId/{id}")
    public UserInfo getUserId(@PathVariable long id) {
        return userService.getUserById(id).orElse(null);
    }

    @PostMapping
    public UserInfo createUser(@RequestBody UserInfo user) {
        return userService.saveUser(user);
    }

    @PutMapping("/{id}")
public ResponseEntity<UserInfo> updateUser(@PathVariable Long id, @RequestBody UserInfo updatedUser) {
    System.out.println(updatedUser);
    Optional<UserInfo> existingUser = userService.getUserById(id);
    if (existingUser.isPresent()) {
        UserInfo user = existingUser.get();
        System.out.println(user);
        // Update only the fields that are present in the request
        if (updatedUser.getName() != null) {
            user.setName(updatedUser.getName());
        }
        if (updatedUser.getEmail() != null) {
            user.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getRoles() != null) {
            user.setRoles(updatedUser.getRoles());
        }

        // Update the blocked status if provided in the request
        if (updatedUser.getBlocked() != null) {
            user.setBlocked(updatedUser.getBlocked());
        }
        System.out.println(user);
        userService.updateUser(user);
        return ResponseEntity.ok(user);
    } else {
        return ResponseEntity.notFound().build();
    }
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        System.out.println("Received authentication request: " + authRequest);
        UserInfo user = userService.getUserByEmail(authRequest.getUsername()).orElse(null);
        if(user == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(authRequest.getUsername());
                AuthResponse authresponse = new AuthResponse(token, userService.getUserByEmail(authRequest.getUsername()).orElse(null));
                return ResponseEntity.ok(authresponse);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }
    }
}