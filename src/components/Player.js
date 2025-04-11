import React, { useEffect, useRef, useState } from "react";
import {
  BsThreeDots,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import { FaBackward, FaForward, FaPlay, FaPause } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { songs } from "../data/songs";

export default function Player({ currentId, setCurrentId }) {
  const [id, setId] = useState(currentId);
  const [song, setSong] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeOn, setVolumeOn] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);

  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favouriteSongs");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      const current = audio.currentTime;
      const duration = audio.duration || 1;
      const progressPercent = (current / duration) * 100;
      setProgress(progressPercent);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentId]);

  useEffect(() => {
    setIsPlaying(false);
    const newSong = songs[id];
    setSong(newSong);
    setCurrentId(id);
  }, [id]);

  useEffect(() => {
    setId(currentId);
  }, [currentId]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Autoplay error:", err);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleVolume = () => {
    const audio = audioRef.current;
  
    if (!audio) return;
  
    if (volumeOn) {
      audio.muted = true;
    } else {
      audio.muted = false;
    }
  
    setVolumeOn(!volumeOn);
  };
  


  const playNext = () => {
    if (id < songs.length - 1) setId(id + 1);
  };

  const playPrev = () => {
    if (id > 0) setId(id - 1);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audio.duration;
    audio.currentTime = newTime;
  };

  const toggleFavourite = () => {
    const isFav = favourites.some((fav) => fav.title === song.title);
    const updated = isFav
      ? favourites.filter((fav) => fav.title !== song.title)
      : [...favourites, song];
    setFavourites(updated);
    localStorage.setItem("favouriteSongs", JSON.stringify(updated));
  };

  return (
    <div className="fixed md:static  top-[4rem] w-full md:w-[18rem] lg:w-[30rem] xl:w-[44rem] bg-neutral-900 text-white p-4 md:p-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Blurred background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center blur-lg opacity-30"
        style={{ backgroundImage: `url(${song.img})` }}
      ></div>

      <div className="relative z-10 mt-0  md:mt-40 lg:mt-10 xl:mt-0">
        <div className="w-[420px] h-[620px] flex flex-col items-center">
        <div className="w-[240px]  md:w-[200px] lg:w-[340px] xl:w-[420px]  md:mb-4 flex flex-col items-center justify-center md:justify-start md:items-start text-center">
  <h2 className="text-2xl hidden md:block font-bold">{song.title}</h2>
  <p className="text-sm text-white mb-2">{song.artist}</p>
</div>

          <img
            src={song.img || "/image/a.jpg"}
            alt={song.title}
            className="w-[220px] h-[180px] md:w-[200px] md:h-[180px] lg:w-[340px] xl:w-[420px] lg:h-[300px] xl:h-[440px] rounded-lg mb-2 md:mb-4 object-fill"
          />

          {/* Progress bar */}
          <div
            className="w-[220px] md:w-[200px] lg:w-[340px] xl:w-[420px] h-1 bg-neutral-700 mb-2 md:mb-6 cursor-pointer relative"
            onClick={handleSeek}
            ref={progressRef}
          >
            <div
              className="h-full bg-green-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Controls */}
          <div className="flex space-x-4 text-xl w-[220px] md:w-[200px] lg:w-[340px]  xl:w-[420px] justify-between items-center">
            {/* More Options */}
            <div className="relative">
              <BsThreeDots
                className="cursor-pointer"
                onClick={() => setShowOptions(!showOptions)}
              />
              {showOptions && (
                <div className="absolute top-6 -right-4 bg-neutral-800 text-white px-4 py-2 rounded shadow">
                  <button
                    onClick={toggleFavourite}
                    className="flex items-center gap-2"
                  >
                    {favourites.some((fav) => fav.title === song.title) ? (
                      <AiFillHeart className="text-red-500" />
                    ) : (
                      <AiOutlineHeart className="text-white" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Playback Buttons */}
            <div className="flex gap-8 justify-center items-center">
              <button onClick={playPrev}>
                <FaBackward color={id === 0 ? "gray" : "white"} />
              </button>
              <button
                onClick={togglePlay}
                className="bg-white text-black rounded-full p-3"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={playNext}>
                <FaForward
                  color={id === songs.length - 1 ? "gray" : "white"}
                />
              </button>
            </div>

            {/* Volume Toggle */}
            <button onClick={toggleVolume}>
              {volumeOn ? <BsFillVolumeUpFill /> : <BsFillVolumeMuteFill />}
            </button>
          </div>

          {/* Audio Element */}
          <audio ref={audioRef} src={song.song} />
        </div>
      </div>
    </div>
  );
}
