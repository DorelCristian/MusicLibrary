package com.example.backend.controller;

import com.example.backend.model.Artist;
import com.example.backend.repository.ArtistRepository;
import com.example.backend.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/artists")
@CrossOrigin(origins = "*")
public class ArtistController {

    @Autowired
    private ArtistRepository artistRepository;

    @GetMapping
    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    @GetMapping("/{id}")
    public Artist getArtistById(@PathVariable Long id) {
        return artistRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Artist not found"));
    }

    @PostMapping
    public Artist createArtist(@RequestBody Artist artist) {
        return artistRepository.save(artist);
    }

    @PutMapping("/{id}")
    public Artist updateArtist(@PathVariable Long id, @RequestBody Artist artistDetails) {
        Artist artist = artistRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Artist not found"));
        artist.setName(artistDetails.getName());
        return artistRepository.save(artist);
    }

    @DeleteMapping("/{id}")
    public void deleteArtist(@PathVariable Long id) {
        Artist artist = artistRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Artist not found"));
        artistRepository.delete(artist);
    }

    @GetMapping("/search")
    public List<Artist> searchArtists(@RequestParam String name) {
        return artistRepository.findByNameContainingIgnoreCase(name);
    }
}
