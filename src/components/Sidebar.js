import React from "react";

export default function Sidebar({ onSelectTab }) {
  return (
    <aside className="w-1/4 bg-black text-white p-6 flex flex-col justify-between min-h-screen">
      <div className="flex flex-col gap-3">
        <img
          src="/image/logoImage/Vector.png"
          alt="Logo"
          className="w-32 z-10 h-10"
        />
        <nav className="relative flex flex-col items-start z-50 mt-6 space-y-4">
          <button onClick={() => onSelectTab("For You")}>
            <p>For You</p>
          </button>
          <button onClick={() => onSelectTab("Top Tracks")}>
            <p>Top Tracks</p>
          </button>
          <button onClick={() => onSelectTab("Favourites")}>
            <p>Favourites</p>
          </button>
          <button onClick={() => console.log("Recently Played clicked")}>
            <p>Recently Played</p>
          </button>
        </nav>
      </div>

      <div className="flex ">
        <img src="/image/profile.png" alt="profile" />
      </div>
    </aside>
  );
}
