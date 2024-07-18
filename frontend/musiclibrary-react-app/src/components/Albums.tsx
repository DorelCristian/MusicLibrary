import React, { useEffect, useState } from "react";
import {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getArtists,
} from "../services/api";
import { Album, Artist } from "../types";

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [newAlbum, setNewAlbum] = useState({
    id: 0,
    title: "",
    description: "",
    artistId: 0,
  });

  useEffect(() => {
    fetchAlbums();
    fetchArtists();
  }, []);

  const fetchAlbums = async () => {
    const response = await getAlbums();
    setAlbums(response.data);
  };

  const fetchArtists = async () => {
    const response = await getArtists();
    setArtists(response.data);
  };

  const handleUpdateAlbum = async (id: number) => {
    const albumData = {
      title: newAlbum.title,
      description: newAlbum.description,
      artist: { id: newAlbum.artistId },
    };
    await updateAlbum(id, albumData);
    fetchAlbums();
    setNewAlbum({
      id: 0,
      title: "",
      description: "",
      artistId: 0,
    });
  };

  const handleDeleteAlbum = async (id: number) => {
    await deleteAlbum(id);
    fetchAlbums();
  };

  return (
    <div className="container">
      <h1>Albums</h1>
      <input
        type="text"
        value={newAlbum.title}
        onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
        placeholder="New album title"
      />
      <input
        type="text"
        value={newAlbum.description}
        onChange={(e) =>
          setNewAlbum({ ...newAlbum, description: e.target.value })
        }
        placeholder="New album description"
      />
      <select
        value={newAlbum.artistId}
        onChange={(e) =>
          setNewAlbum({
            ...newAlbum,
            artistId: Number(e.target.value),
          })
        }
      >
        <option value={0}>Select artist</option>
        {artists.map((artist) => (
          <option key={artist.id} value={artist.id}>
            {artist.name}
          </option>
        ))}
      </select>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <strong>{album.title}</strong>
            <div>Description: {album.description}</div>
            <div>
              <button onClick={() => handleUpdateAlbum(album.id)}>
                Update
              </button>
              <button onClick={() => handleDeleteAlbum(album.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
