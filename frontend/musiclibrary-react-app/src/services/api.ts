

// Other functions ...


import axios from 'axios';
import { Artist, Album, Song,AlbumPayload } from '../types';

const API_BASE_URL = '/api';

export const getSongsByAlbumId = (id: number) => {
  return axios.get<Song[]>(`${API_BASE_URL}/albums/${id}/songs`);
};

export const searchArtists = (name: string) => {
  return axios.get<Artist[]>(`${API_BASE_URL}/artists/search`, { params: { name } });
};

export const getArtists = (params?: Record<string, string>) => {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  return axios.get<Artist[]>(`${API_BASE_URL}/artists${queryString}`);
};

export const getArtistById = (id: number) => {
  return axios.get<Artist>(`${API_BASE_URL}/artists/${id}`);
};

export const getAlbums = () => {
  return axios.get<Album[]>(`${API_BASE_URL}/albums`);
};

export const getAllAlbumsByArtist = (id: number) => {
  return axios.get<Album[]>(`${API_BASE_URL}/albums/by-artist/${id}`);
};

export const getAllSongsByAlbum = (id: number) => {
  return axios.get<Song[]>(`${API_BASE_URL}/songs/by-album/${id}`);
};

export const getAlbumById = (id: number) => axios.get<Album>(`${API_BASE_URL}/albums/${id}`);
export const getSongsByAlbum = (albumId: number) => axios.get<Song[]>(`${API_BASE_URL}/albums/${albumId}/songs`);

export const createArtist = (artist: Artist) => axios.post<Artist>(`${API_BASE_URL}/artists`, artist);
export const updateArtist = (id: number, artist: Artist) => axios.put<Artist>(`${API_BASE_URL}/artists/${id}`, artist);
export const deleteArtist = (id: number) => axios.delete(`${API_BASE_URL}/artists/${id}`);



/*export const createAlbum = (album: Album) => axios.post<Album>(`${API_BASE_URL}/albums`, album);
export const updateAlbum = (id: number, album: Album) => axios.put<Album>(`${API_BASE_URL}/albums/${id}`, album);
export const deleteAlbum = (id: number) => axios.delete(`${API_BASE_URL}/albums/${id}`);*/

export const createAlbum = (album: AlbumPayload) => axios.post<Album>(`${API_BASE_URL}/albums`, album);
export const updateAlbum = (id: number, album: AlbumPayload) => axios.put<Album>(`${API_BASE_URL}/albums/${id}`, album);
export const deleteAlbum = (id: number) => axios.delete(`${API_BASE_URL}/albums/${id}`);


export const getSongs = () => axios.get<Song[]>(`${API_BASE_URL}/songs`);

export const getSongById = (id: number) => axios.get<Song>(`${API_BASE_URL}/songs/${id}`);
export const createSong = (song: Song) => axios.post<Song>(`${API_BASE_URL}/songs`, song);
export const updateSong = (id: number, song: Song) => axios.put<Song>(`${API_BASE_URL}/songs/${id}`, song);
export const deleteSong = (id: number) => axios.delete(`${API_BASE_URL}/songs/${id}`);