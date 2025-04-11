import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Sidebar({ onSelectTab, activeTab }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const tabs = ["For You", "Top Tracks", "Favourites", "Recently Played"];

  return (
    <>
      {/* Hamburger Button (only visible on mobile) */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed top-3 left-3 text-white text-2xl p-3 z-50"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-full xs:w-44 sm:w-64 md:w-1/4 bg-black/90 backdrop-blur-sm text-white p-6
        transform transition-transform duration-300 ease-in-out 
        ${showSidebar ? "translate-x-0 z-40" : "-translate-x-full "} z-10
        md:translate-x-0 md:block`}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col justify-between h-full">
          <div className=" ">
            {/* Logo */}
            <img
              src="/image/logoImage/Vector.png"
              alt="Logo"
              onClick={() => {
                onSelectTab("For You");
                setShowSidebar(false);
              }}
              className="w-32 h-10  cursor-pointer mb-6"
            />

            {/* Navigation Tabs */}
            <nav className="flex flex-col gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    onSelectTab(tab);
                    setShowSidebar(false);
                  }}
                  className={`text-left ${
                    activeTab === tab
                      ? "text-gray-400 font-semibold"
                      : "text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Profile Image */}
          <div className="pt-8 ">
            <img
              src="/image/profile.png"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </aside>

      {/* Overlay (only on mobile when sidebar is open) */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50  md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </>
  );
}
