import React from "react";
import { songs } from "../data/songs";


export default function SongList({ onSelect, currentIndex }) {
  return (
    <div className="flex-1 bg-neutral-900  text-white p-6 overflow-y-auto scrollbar-hide">
      <input
        type="text"
        placeholder="Search Song, Artist"
        className="w-full sticky top-0 p-2 mb-4  rounded bg-neutral-800 text-white"
      />
      <ul className="space-y-2">
        {songs.map((song, index) => (
          <li
            key={index}
            onClick={() => onSelect(index)}
            className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-neutral-800 ${
              index === currentIndex ? "bg-neutral-700" : ""
            }`}
          >
            <div className="flex items-center space-x-4">
              <img src={song.img} alt={song.title} className="w-10 h-10 rounded" />
              <div>
                <p>{song.title}</p>
                <p className="text-xs text-gray-400">{song.artist}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">{song.duration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
