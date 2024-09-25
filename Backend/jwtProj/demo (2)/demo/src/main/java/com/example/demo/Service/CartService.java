package com.example.demo.Service;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Entity.Cart;
import com.example.demo.Entity.UserInfo;
import com.example.demo.Repository.CartRepository;
import com.example.demo.Repository.UserInfoRepository;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public List<Cart> getCartsByUserId(Long userId) {
        UserInfo user = userInfoRepository.findById(userId).orElse(null);
        return cartRepository.findByUser(user);
    }

    public Optional<Cart> getCartById(Long id) {
        return cartRepository.findById(id);
    }

    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }

    public Cart updateCart(Long id, Cart cartDetails) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.setName(cartDetails.getName());
        cart.setPrice(cartDetails.getPrice());
        cart.setImg(cartDetails.getImg());
        cart.setDescription(cartDetails.getDescription());
        return cartRepository.save(cart);
    }
}
