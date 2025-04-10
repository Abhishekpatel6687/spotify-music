import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-1/4 bg-black text-white p-6 space-y-6">
  <div className="flex items-center gap-3">
  <img 
    src="/image/logoImage/Vector.png" 
    alt="Logo" 
    className="w-32 h-10"
  />
</div>


      <nav className="space-y-4">
        <p>For You</p>
        <p>Top Tracks</p>
        <p>Favourites</p>
        <p>Recently Played</p>
      </nav>
    </aside>
  );
}
