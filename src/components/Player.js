import React, { useRef, useState } from "react";
import { BsThreeDots, BsFillVolumeUpFill } from "react-icons/bs";
import { FaBackward, FaForward, FaPlay, FaPause } from "react-icons/fa";
import { songs } from "../data/songs";

export default function Player({ currentIndex }) {
  const song = songs[currentIndex];
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-1/2 bg-neutral-900 text-white  p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-2">{song.title}</h2>
      <p className="text-sm text-gray-400 mb-4">{song.artist}</p>
      <img
        src={song.img}
        alt={song.title}
        className="w-64 h-64 rounded mb-4 object-cover"
      />
      <div className="w-full h-1 bg-neutral-700 mb-4">
        <div className="h-full bg-green-500 w-1/3"></div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 text-xl items-center">
        <BsThreeDots className="cursor-pointer" />
        <FaBackward />
        <button
          onClick={togglePlay}
          className="bg-white text-black rounded-full p-3"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <FaForward />
        <BsFillVolumeUpFill className="cursor-pointer" />
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={song.song} />
    </div>
  );
}
