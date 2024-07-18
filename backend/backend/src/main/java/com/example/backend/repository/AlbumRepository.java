package com.example.backend.repository;

import com.example.backend.model.Album;
import com.example.backend.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> findByTitleContainingIgnoreCase(String name);
    List<Album> findByArtist(Artist artist);
}