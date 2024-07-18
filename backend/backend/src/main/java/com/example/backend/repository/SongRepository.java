package com.example.backend.repository;



import com.example.backend.model.Album;
import com.example.backend.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByTitleContainingIgnoreCase(String name);
    List<Song> findByAlbum(Album album);
}
