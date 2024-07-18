import React, { useEffect, useState } from "react";
import {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
  getAlbums,
} from "../services/api";
import { Song, Album } from "../types";

const Songs: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [newSong, setNewSong] = useState<Song>({
    id: 0,
    title: "",
    length: "",
    album: { id: 0, title: "", description: "", artist: { id: 0, name: "" } },
  });

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  const fetchSongs = async () => {
    const response = await getSongs();
    setSongs(response.data);
  };

  const fetchAlbums = async () => {
    const response = await getAlbums();
    setAlbums(response.data);
  };

  const handleUpdateSong = async (id: number) => {
    if (selectedAlbum) {
      await updateSong(id, { ...newSong, album: selectedAlbum });
      fetchSongs();
      setNewSong({
        id: 0,
        title: "",
        length: "",
        album: {
          id: 0,
          title: "",
          description: "",
          artist: { id: 0, name: "" },
        },
      });
    }
  };

  const handleDeleteSong = async (id: number) => {
    await deleteSong(id);
    fetchSongs();
  };

  return (
    <div>
      <h1>Songs</h1>
      <input
        type="text"
        value={newSong.title}
        onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
        placeholder="New song title"
      />
      <input
        type="text"
        value={newSong.length}
        onChange={(e) => setNewSong({ ...newSong, length: e.target.value })}
        placeholder="New song length"
      />
      <select
        value={selectedAlbum?.id || 0}
        onChange={(e) =>
          setSelectedAlbum(
            albums.find((album) => album.id === Number(e.target.value)) || null
          )
        }
      >
        <option value={0}>Select album</option>
        {albums.map((album) => (
          <option key={album.id} value={album.id}>
            {album.title}
          </option>
        ))}
      </select>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <strong>{song.title}</strong>
            <div>Length: {song.length}</div>
            <button onClick={() => handleUpdateSong(song.id)}>Update</button>
            <button onClick={() => handleDeleteSong(song.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Songs;
