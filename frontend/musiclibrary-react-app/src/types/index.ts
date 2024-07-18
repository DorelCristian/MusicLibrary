export interface Artist {
  id: number;
  name: string;
}

export interface Album {
  id: number;
  title: string;
  description: string;
  artist: Artist;
}

export interface Song {
  id: number;
  title: string;
  length: string;
  album: Album;
}
export interface AlbumPayload {
  title: string;
  description: string;
  artist: { id: number };
}
