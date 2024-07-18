// src/main/java/com/example/musicalibrary/controller/ArtistController.java
package com.example.backend.controller;


import com.example.backend.model.Album;
import com.example.backend.model.Artist;
import com.example.backend.model.Song;
import com.example.backend.repository.AlbumRepository;
import com.example.backend.ResourceNotFoundException;
import com.example.backend.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/albums")
@CrossOrigin(origins = "*")  // Adaugă aceasta linie dacă ai probleme CORS
public class AlbumController {

    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private ArtistRepository artistRepository;

    @GetMapping
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    @GetMapping("/by-artist/{id}")
    public List<Album> getAllAlbumsByArtist(@PathVariable Long id) {
        // Verifică existența artistului
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artist not found with id: " + id));

        // Obține toate albumele pentru artistul dat
        List<Album> albums = albumRepository.findByArtist(artist);

        // Setează artistul pentru fiecare album (nu este nevoie să setezi artistul din nou, deoarece este deja setat în entitatea Album)
        // albums.forEach(album -> album.setArtist(artist));

        return albums;
    }
    @GetMapping("/{id}")
    public Album getAlbumById(@PathVariable Long id) {
        return albumRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Album not found"));
    }

    @PostMapping
    public Album createAlbum(@RequestBody Album album) {
        return albumRepository.save(album);
    }

    @PutMapping("/{id}")
    public Album updateAlbum(@PathVariable Long id, @RequestBody Album albumDetails) {
        Album album = albumRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Album not found"));
        album.setTitle(albumDetails.getTitle());
        album.setDescription(albumDetails.getDescription());
        return albumRepository.save(album);
    }

    @DeleteMapping("/{id}")
    public void deleteAlbum(@PathVariable Long id) {
        Album album = albumRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Album not found"));
        albumRepository.delete(album);
    }
}
