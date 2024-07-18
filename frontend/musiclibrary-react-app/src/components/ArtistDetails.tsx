import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArtistById,
  getAllAlbumsByArtist,
  getAllSongsByAlbum,
} from "../services/api";
import { Artist, Album, Song } from "../types";

const ArtistDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(
    new Set()
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtistAndAlbums = async () => {
      try {
        const artistResponse = await getArtistById(Number(id));
        setArtist(artistResponse.data);
        const albumsResponse = await getAllAlbumsByArtist(Number(id));
        setAlbums(albumsResponse.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch artist details");
      }
    };
    fetchArtistAndAlbums();
  }, [id]);

  const fetchAlbumSongs = async (albumId: number) => {
    try {
      const songsResponse = await getAllSongsByAlbum(albumId);
      setSongs(songsResponse.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch album songs");
    }
  };

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    fetchAlbumSongs(album.id);
  };

  const toggleDescription = (albumId: number) => {
    setExpandedDescriptions((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(albumId)) {
        newExpanded.delete(albumId);
      } else {
        newExpanded.add(albumId);
      }
      return newExpanded;
    });
  };

  if (error) return <div>{error}</div>;
  if (!artist) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{artist.name}</h1>
      <h2>Albums</h2>
      <ul>
        {albums.map((album: Album) => (
          <li key={album.id} onClick={() => handleAlbumClick(album)}>
            <div className="album-title">{album.title}</div>
            <div
              className={`description ${
                expandedDescriptions.has(album.id) ? "expand" : ""
              }`}
            >
              {album.description}
            </div>
            <div
              className="show-more"
              onClick={() => toggleDescription(album.id)}
            >
              {expandedDescriptions.has(album.id) ? "Show Less" : "Show More"}
            </div>
          </li>
        ))}
      </ul>
      {selectedAlbum && (
        <div>
          <h3>Songs in {selectedAlbum.title}</h3>
          <ul>
            {songs.map((song: Song) => (
              <li key={song.id}>{song.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArtistDetails;
