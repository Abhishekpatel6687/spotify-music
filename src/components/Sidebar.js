import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-1/4 bg-black text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold">Spotify</h1>
      <nav className="space-y-4">
        <p>For You</p>
        <p>Top Tracks</p>
        <p>Favourites</p>
        <p>Recently Played</p>
      </nav>
    </aside>
  );
}
