package com.example.backend.controller;

import com.example.backend.ResourceNotFoundException;
import com.example.backend.model.Album;
import com.example.backend.model.Song;
import com.example.backend.repository.AlbumRepository;
import com.example.backend.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/songs")
@CrossOrigin(origins = "*")
public class SongController {

    @Autowired
    private SongRepository songRepository;
    @Autowired
    private AlbumRepository albumRepository;

    @GetMapping
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    @GetMapping("/{id}")
    public Song getSongById(@PathVariable Long id) {
        return songRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Song not found"));
    }

    @GetMapping("/by-album/{id}")
    public List<Song> getAllSongsByAlbum(@PathVariable Long id) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Album not found with id: " + id));
        List<Song> songs = songRepository.findByAlbum(album);
        return songs;
    }

    @PostMapping
    public Song createSong(@RequestBody Song song) {
        return songRepository.save(song);
    }

    @PutMapping("/{id}")
    public Song updateSong(@PathVariable Long id, @RequestBody Song songDetails) {
        Song song = songRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Song not found"));
        song.setTitle(songDetails.getTitle());
        song.setLength(songDetails.getLength());
        return songRepository.save(song);
    }

    @DeleteMapping("/{id}")
    public void deleteSong(@PathVariable Long id) {
        Song song = songRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Song not found"));
        songRepository.delete(song);
    }
}
