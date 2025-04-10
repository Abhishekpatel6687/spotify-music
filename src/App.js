import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import SongList from "./components/SongList";
import Player from "./components/Player";

export default function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <SongList currentIndex={currentSongIndex} onSelect={setCurrentSongIndex} />
      <Player currentIndex={currentSongIndex} setCurrentIndex={setCurrentSongIndex}/>
    </div>
  );
}
