import React, { useEffect, useState } from "react";
import {
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
} from "../services/api";
import { Artist } from "../types";

const Artists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [newArtist, setNewArtist] = useState<Artist>({ id: 0, name: "" });

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    const response = await getArtists();
    setArtists(response.data);
  };

  const handleCreateArtist = async () => {
    await createArtist(newArtist);
    fetchArtists();
    setNewArtist({ id: 0, name: "" });
  };

  const handleUpdateArtist = async (id: number) => {
    await updateArtist(id, newArtist);
    fetchArtists();
    setNewArtist({ id: 0, name: "" });
  };

  const handleDeleteArtist = async (id: number) => {
    await deleteArtist(id);
    fetchArtists();
  };

  return (
    <div className="container">
      <h1>Artists</h1>
      <input
        type="text"
        value={newArtist.name}
        onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
        placeholder="New artist name"
      />
      <button onClick={handleCreateArtist}>Add Artist</button>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.name}
            <div>
              <button onClick={() => handleUpdateArtist(artist.id)}>
                Update
              </button>
              <button onClick={() => handleDeleteArtist(artist.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Artists;
