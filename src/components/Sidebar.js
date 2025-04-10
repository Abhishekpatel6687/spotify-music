import React from "react";

export default function Sidebar({ onSelectTab, activeTab }) {
  return (
    <aside className="w-1/4 bg-black text-white p-6 flex flex-col justify-between min-h-screen">
      <div className="flex flex-col gap-3">
        <img
          src="/image/logoImage/Vector.png"
          alt="Logo"
          onClick={() => onSelectTab("For You")}
          className="w-32 z-10 h-10 cursor-pointer"
        />

        <nav className="relative flex flex-col items-start z-50 mt-6 space-y-4">
          {["For You", "Top Tracks", "Favourites", "Recently Played"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => onSelectTab(tab)}
                className={`text-left ${
                  activeTab === tab ? "text-gray-600 font-semibold" : "text-white"
                }`}
              >
                <p>{tab}</p>
              </button>
            )
          )}
        </nav>
      </div>

      <div className="flex">
        <img src="/image/profile.png" alt="profile" />
      </div>
    </aside>
  );
}
