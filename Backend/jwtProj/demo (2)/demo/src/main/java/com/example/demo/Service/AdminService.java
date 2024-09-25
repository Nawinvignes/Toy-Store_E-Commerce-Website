package com.example.demo.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Entity.Admin;
import com.example.demo.Repository.AdminRepository;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin findAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    public void registerAdmin(Admin admin) {
        adminRepository.save(admin);
    }

    public Admin authorizeAdmin(String email, String password) {
        return adminRepository.findByEmailAndPassword(email, password);
    }

    public List<Admin> findAllAdmins() {
        return adminRepository.findByRole("admin");
    }

    public Admin findAdminById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    public void updateAdmin(Admin admin) {
        adminRepository.save(admin);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    public boolean verifyPassword(String email, String password) {
        Admin admin = adminRepository.findByEmailAndPassword(email, password);
        return admin != null;
    }
}