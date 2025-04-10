import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots, BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { FaBackward, FaForward, FaPlay, FaPause } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { songs } from "../data/songs";

export default function Player({ currentId, setCurrentId }) {
  const[id, setId] = useState(currentId)
  // console.log(id,'idddd')
  const [song, setSong] = useState([])
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [valumeOn, setValumeOn] = useState(true)


  const [progress, setProgress] = useState(0); // progress in %
  const progressRef = useRef(null); // for progress bar DOM access

  const [showOptions, setShowOptions] = useState(false);

  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favouriteSongs");
    return stored ? JSON.parse(stored) : [];
  });
  // console.log(favourites,'favourites')

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
  
    const rect = bar.getBoundingClientRect(); // position of bar
    const clickX = e.clientX - rect.left; // click pos within bar
    const newTime = (clickX / rect.width) * audio.duration;
  
    audio.currentTime = newTime;
  };

  useEffect(() => { 
    const audio = audioRef.current;
  
    const updateProgress = () => {
      const current = audio.currentTime;
      const duration = audio.duration || 1;
      const progressPercent = (current / duration) * 100;
      setProgress(progressPercent);
    };
  
    const handleEnded = () => {
      setIsPlaying(false); // Song khatam hote hi playing false
    };
  
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded); // 👈 add this
  
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded); // 👈 cleanup bhi zaruri hai
    };
  }, [currentId]);
  

  useEffect(() => {
    setIsPlaying(false);
    const newSong  = songs[id]
    setSong(newSong )    
    setCurrentId(id);
  },[id])
  
  useEffect(() => {
    setId(currentId);
  }, [currentId]);
  

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

  const toggleVolume = () => {
    const audio = audioRef.current;
  
    if (valumeOn) {
      audio.muted = true;        
      setValumeOn(false);         
    } else {
      audio.muted = false;         
      setValumeOn(true);          
    }
  };
  
  const playNext = () => {
    if(id < songs.length-1){
    
      setId(id + 1)      
      // setCurrentId(currentId + 1);    
    }
  }

  const playPrev = () => {
    if(id > 0){
      setId(id - 1)      
      // setCurrentId(currentId - 1);    
    }
  }
  
  const toggleFavourite = () => {
    const isFav = favourites.some((fav) => fav.title === song.title);
    let updatedFavourites;
  
    if (isFav) {
      updatedFavourites = favourites.filter((fav) => fav.title !== song.title);
    } else {
      updatedFavourites = [...favourites, song];
    }
  
    setFavourites(updatedFavourites);
    localStorage.setItem("favouriteSongs", JSON.stringify(updatedFavourites));
  };
  return (
    <div className="w-[44rem]  bg-neutral-900 text-white  p-6 flex flex-col items-center justify-center">
{
  [song].map((item, i) => {
    return(
      <div key={i} className=" w-[420px] h-[620px] flex flex-col items-center">
      <div className="w-full mb-4">
    <h2 className="text-2xl font-bold">{item.title}</h2>
    <p className="text-sm text-white mb-2">{item.artist}</p>
      </div>
      <div>
         <img
      src={item.img}
      alt={item.title}
      className="w-[460px] h-[440px] rounded-lg mb-4 object-fill"
    />
      </div>
   
      <div
  className="w-full h-1 bg-neutral-700 mb-6 cursor-pointer relative"
  onClick={(e) => handleSeek(e)}
  ref={progressRef}
>
  <div
    className="h-full bg-green-500 transition-all duration-200"
    style={{ width: `${progress}%` }}
  ></div>
</div>


    {/* Buttons */}
    <div className="flex space-x-4 text-xl w-full justify-between items-center">
 <div className="relative">
  <BsThreeDots
    className="cursor-pointer"
    onClick={() => setShowOptions(!showOptions)}
  />
  {showOptions && (
    <div className="absolute top-6 -right-4 bg-neutral-800 text-white px-4 py-2 rounded shadow">
   <button onClick={toggleFavourite} className="flex items-center  gap-2">
  {favourites.some((fav) => fav.title === song.title) ? (
    // <button>
      <AiFillHeart className="text-red-500" />
    //   <span>Remove from Favourite</span>
    // </button>
  ) : (
    // <button>
      <AiOutlineHeart className="text-white" />
    //   <span>Add to Favourite</span>
    // </button>
  )}
</button>
    </div>
  )}
</div>


      <div className="flex gap-8 justify-center items-center">
         <button onClick={playPrev} >
      <FaBackward color={id === 0 ? "gray" : "white"}/>
      </button>
      <button
        onClick={togglePlay}
        className="bg-white text-black rounded-full p-3"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button onClick={playNext} >
      <FaForward color={id === songs.length - 1 ? "gray" : "white"}/>
      </button>
     
      </div>
     <button onClick={toggleVolume} >
      {valumeOn ? <BsFillVolumeUpFill /> :  <BsFillVolumeMuteFill/>}
     </button>
    </div>

    {/* Audio Element */}
    <audio ref={audioRef} src={item.song} />
    </div>
    )
  })
}
    </div>
  );
}
