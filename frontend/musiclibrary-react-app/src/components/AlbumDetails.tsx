import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbumById, getSongsByAlbum } from "../services/api";
import { Album, Song } from "../types";

const AlbumDetails: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const albumResponse = await getAlbumById(Number(albumId));
        setAlbum(albumResponse.data);
        const songsResponse = await getSongsByAlbum(Number(albumId));
        setSongs(songsResponse.data);
      } catch (error) {
        console.error("Failed to fetch album details:", error);
      }
    };

    fetchAlbumDetails();
  }, [albumId]);

  return (
    <div className="container">
      {album ? (
        <>
          <h1>{album.title}</h1>
          <p>{album.description}</p>
          <h2>Songs</h2>
          <ul>
            {songs.map((song) => (
              <li key={song.id}>{song.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AlbumDetails;
