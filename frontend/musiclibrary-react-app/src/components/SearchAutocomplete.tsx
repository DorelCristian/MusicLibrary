import React, { useState } from "react";
import { searchArtists } from "../services/api";
import { Artist } from "../types";
import { useNavigate } from "react-router-dom";

const SearchAutocomplete: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length >= 1) {
      setIsLoading(true);
      try {
        const response = await searchArtists(value);
        setSuggestions(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch artists");
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (artistId: number) => {
    navigate(`/artists/${artistId}`);
  };

  return (
    <div className="container">
      <h1>Search artist</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for artists"
      />
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <ul>
        {suggestions.map((artist) => (
          <li key={artist.id} onClick={() => handleSelect(artist.id)}>
            {artist.name}
          </li>
        ))}
      </ul>
      <div>
        <h3>Navigation</h3>
        <ul>
          <li onClick={() => navigate("/artists")}>Lista Artisti</li>
          <li onClick={() => navigate("/albums")}>Lista Albume</li>
          <li onClick={() => navigate("/songs")}>Lista melodii</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchAutocomplete;
