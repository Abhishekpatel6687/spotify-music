import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import { songs } from "./data/songs";


export default function App() {
  const [currentSongId, setCurrentSongId] = useState(0);
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [activeTab, setActiveTab] = useState("For You");

  const handleSidebarSelect = (tab) => {
    setActiveTab(tab);

    if (tab === "For You") {
      setFilteredSongs(songs);
    } else if (tab === "Top Tracks") {
      setFilteredSongs(songs.slice(0, 5));
    } else if (tab === "Favourites") {
      const stored = localStorage.getItem("favouriteSongs");
      const parsed = stored ? JSON.parse(stored) : [];
      setFilteredSongs(parsed);
    }
  };

  return (
    <div className="flex h-screen ">
     <Sidebar onSelectTab={handleSidebarSelect} />
      <SongList
        currentId={currentSongId}
        onSelect={setCurrentSongId}
        songs={filteredSongs}
        activeTab={activeTab}
      />
      {/* <SongList currentId={currentSongId} onSelect={setCurrentSongId} /> */}
      <Player currentId={currentSongId} setCurrentId={setCurrentSongId}/>
    </div>
  );
}
