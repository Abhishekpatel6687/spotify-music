import React, { useEffect, useState } from "react";
import { songs } from "../data/songs";

export default function SongList({ onSelect, currentId }) {
  const [SongLists, setSongLists] = useState(songs);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSongLists(filteredSongs);
  }, [searchTerm]);

  return (
    <div className="flex-1 bg-neutral-900 text-white p-0 flex flex-col h-full">
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 p-6">
        <h1 className="text-3xl font-semibold mb-4">For You</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Song, Artist"
          className="w-full p-2 rounded bg-neutral-800 text-white"
        />
      </div>

      {/* Scrollable Song List */}
      <div className="flex-1 overflow-y-auto p-6 pt-0 scrollbar-hide">
        <ul className="space-y-2 relative z-50">
          {SongLists.length === 0 ? (
            <p className="text-center text-neutral-400">No songs found.</p>
          ) : (
            SongLists.map((song) => (
              <li
                key={song.id}
                onClick={() => onSelect(song.id)}
                className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-neutral-800 ${
                  song.id === currentId ? "bg-neutral-700" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={song.img}
                    alt={song.title}
                    className="w-10 h-10 rounded"
                  />
                  <div>
                    <p>{song.title}</p>
                    <p className="text-xs text-gray-400">{song.artist}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{song.duration}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
