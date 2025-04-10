import React, { useState } from "react";

export default function Sidebar() {
  const [favouritesData, setFavouritesData] = useState([]);

  const FavouriteListSongs = () => {
    const stored = localStorage.getItem("favouriteSongs");
    const parsed = stored ? JSON.parse(stored) : [];
    setFavouritesData(parsed);
    console.log(parsed, 'Fetched Favourite Songs');
  };

  return (
    <aside className="w-1/4 bg-black text-white p-6 flex flex-col justify-between min-h-screen">

      <div className="flex flex-col gap-3">
        <img 
          src="/image/logoImage/Vector.png" 
          alt="Logo" 
          className="w-32 z-10 h-10"
        />
        <nav className="relative z-50 mt-6 space-y-4">
        <p>For You</p>
        <p>Top Tracks</p>
        <button onClick={FavouriteListSongs}>
          <p>Favourites</p>
        </button>
        <p>Recently Played</p>
      </nav>
      </div>

      

      {/* 👇 Optional: Show favourites when available */}
      {favouritesData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Your Favourites</h3>
          <ul className="space-y-1 text-sm">
            {favouritesData.map((song, index) => (
              <li key={index} className="text-neutral-300">
                {song.title} - {song.artist}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex ">
        <img src="/image/profile.png" alt="profile" />
      </div>
    </aside>
  );
}
