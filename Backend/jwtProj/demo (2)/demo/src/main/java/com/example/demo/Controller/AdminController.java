package com.example.demo.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Entity.Admin;
import com.example.demo.Service.AdminService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/adminauth")
public class AdminController 
{
    @Autowired
    private AdminService adminService;

    @PostMapping("/register")
    public String registerAdmin(@RequestBody Admin admin) 
    {
        Admin existAdmin = adminService.findAdminByEmail(admin.getEmail());
        if (existAdmin == null) {
            adminService.registerAdmin(admin);
            return "saved";
        } else
         {
            return "exist";
        }
    }

    @GetMapping("/signin")
    public ResponseEntity<Admin> signIn(@RequestParam String email, @RequestParam String password) {
        Admin admin = adminService.authorizeAdmin(email, password);
        if (admin != null) 
        {
            return ResponseEntity.ok(admin);
        } else 
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/admins")
    public ResponseEntity<List<Admin>> getAllAdmins() 
    {
        List<Admin> admins = adminService.findAllAdmins();
        return ResponseEntity.ok(admins);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin updatedAdmin) 
    {
        Admin existingAdmin = adminService.findAdminById(id);
        if (existingAdmin == null) {
            return ResponseEntity.notFound().build();
        }

        existingAdmin.setEmail(updatedAdmin.getEmail());
        existingAdmin.setUsername(updatedAdmin.getUsername());
        if (updatedAdmin.getPassword() != null && !updatedAdmin.getPassword().isEmpty()) {
            existingAdmin.setPassword(updatedAdmin.getPassword());
        }
        existingAdmin.setRole(updatedAdmin.getRole());

        adminService.updateAdmin(existingAdmin);
        return ResponseEntity.ok(existingAdmin);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        Admin existingAdmin = adminService.findAdminById(id);
        if (existingAdmin == null) {
            return ResponseEntity.notFound().build();
        }

        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/verify-password")
    public ResponseEntity<Void> verifyPassword(@RequestParam String email, @RequestParam String password) {
        boolean isVerified = adminService.verifyPassword(email, password);
        if (isVerified) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}

