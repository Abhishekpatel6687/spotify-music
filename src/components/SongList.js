import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SongList({ onSelect, currentId, songs, activeTab }) {
  const [SongLists, setSongLists] = useState(songs);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSongLists(filteredSongs);
  }, [searchTerm, songs]);

  return (
    <div className="flex-1  bg-neutral-900  text-white flex flex-col h-full">
      {/* Fixed Searchbar */}
      <div className="fixed top-0 left-0 z-10  flex md:flex-col right-0  px-4 mt-4  md:relative md:px-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-0 hidden md:block md:mb-4">{activeTab}</h1>
        <div className="relative w-full ">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Song, Artist"
            className=" w-[90%] ml-10 md:ml-0 md:w-full  p-2 pr-10 rounded bg-neutral-800 text-white "
          />
          <FaSearch className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400  " />
        </div>
      </div>

      {/* Scrollable Songs */}
      <div className="flex-1 overflow-y-auto p-4 pt-2 mt-[23rem] px-8 md:px-4  md:mt-0 scrollbar-hide">
        <ul className="space-y-2 z-10 relative">
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
                    src={song.img || "/public/image/a.jpg"}
                    alt={song.title}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full object-fill"
                  />
                  <div>
                    <p className="text-sm md:text-base">{song.title}</p>
                    <p className="text-xs text-gray-400">{song.artist}</p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-400">{song.duration}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
