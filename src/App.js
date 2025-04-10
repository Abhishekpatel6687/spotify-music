import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import SongList from "./components/SongList";
import Player from "./components/Player";

export default function App() {
  const [currentSongId, setCurrentSongId] = useState(0);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <SongList currentId={currentSongId} onSelect={setCurrentSongId} />
      <Player currentId={currentSongId} setCurrentId={setCurrentSongId}/>
    </div>
  );
}
