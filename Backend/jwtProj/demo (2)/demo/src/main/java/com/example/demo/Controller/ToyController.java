package com.example.demo.Controller;


import com.example.demo.Entity.Toy;
import com.example.demo.Service.ToyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/toys")
public class ToyController {

    @Autowired
    private ToyService toyService;

    @GetMapping("/get")
    public List<Toy> getAllToys() {
        return toyService.getAllToys();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Toy> getToyById(@PathVariable Long id) {
        Optional<Toy> toy = toyService.getToyById(id);
        return toy.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public Toy createToy(@RequestBody Toy toy) {
        return toyService.saveToy(toy);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Toy> updateToy(@PathVariable Long id, @RequestBody Toy toyDetails) {
        Optional<Toy> toy = toyService.getToyById(id);
        if (toy.isPresent()) {
            Toy updatedToy = toy.get();
            updatedToy.setName(toyDetails.getName());
            updatedToy.setPrice(toyDetails.getPrice());
            updatedToy.setImg(toyDetails.getImg());
            updatedToy.setDescription(toyDetails.getDescription());
            updatedToy.setType(toyDetails.getType());
            toyService.saveToy(updatedToy);
            return ResponseEntity.ok(updatedToy);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteToy(@PathVariable Long id) {
        toyService.deleteToy(id);
        return ResponseEntity.noContent().build();
    }
}