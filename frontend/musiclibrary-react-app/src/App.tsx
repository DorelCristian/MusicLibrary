// App.tsx
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Artists from "./components/Artists";
import SearchAutocomplete from "./components/SearchAutocomplete";
import Albums from "./components/Albums"; // Import the new component
import Songs from "./components/Songs"; // Import the new component
import ArtistDetail from "./components/ArtistDetails"; // Import the new component

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchAutocomplete />} />
        <Route path="/artists/:id" element={<ArtistDetail />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/songs" element={<Songs />} />
        {/* New Route */}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
