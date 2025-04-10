import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots, BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { FaBackward, FaForward, FaPlay, FaPause } from "react-icons/fa";
import { songs } from "../data/songs";

export default function Player({ currentIndex, setCurrentIndex }) {
  const[index, setIndex] = useState(currentIndex)
  const [song, setSong] = useState([])
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [valumeOn, setValumeOff] = useState(true)

  useEffect(() => {
    setIsPlaying(false);
    const newSong  = songs[index]
    setSong(newSong )    
    setCurrentIndex(index);
  },[index])
  
  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);
  

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
      setValumeOff(false);         
    } else {
      audio.muted = false;         
      setValumeOff(true);          
    }
  };
  
  const playNext = () => {
    if(index < songs.length-1){
    
      setIndex(index + 1)      
      // setCurrentIndex(currentIndex + 1);    
    }
  }

  const playPrev = () => {
    if(index > 0){
      setIndex(index - 1)      
      // setCurrentIndex(currentIndex - 1);    
    }
  }
  
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
   
    <div className="w-full h-1 bg-neutral-700 mb-6">
      <div className="h-full bg-green-500 w-1/3"></div>
    </div>

    {/* Buttons */}
    <div className="flex space-x-4 text-xl w-full justify-between items-center">
      <BsThreeDots className="cursor-pointer" />
      <div className="flex gap-8 justify-center items-center">
         <button onClick={playPrev} >
      <FaBackward color={index === 0 ? "gray" : "white"}/>
      </button>
      <button
        onClick={togglePlay}
        className="bg-white text-black rounded-full p-3"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button onClick={playNext} >
      <FaForward color={index === songs.length - 1 ? "gray" : "white"}/>
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
      {/* <div className=" w-[420px] h-[620px] flex flex-col items-center">
        <div className="w-full mb-4">
      <h2 className="text-2xl font-bold">{song.title}</h2>
      <p className="text-sm text-white mb-2">{song.artist}</p>
        </div>
        <div>
           <img
        src={song.img}
        alt={song.title}
        className="w-[460px] h-[440px] rounded-lg mb-4 object-fill"
      />
        </div>
     
      <div className="w-full h-1 bg-neutral-700 mb-6">
        <div className="h-full bg-green-500 w-1/3"></div>
      </div>

      <div className="flex space-x-4 text-xl w-full justify-between items-center">
        <BsThreeDots className="cursor-pointer" />
        <div className="flex gap-8 justify-center items-center">
           <FaBackward color="gray"/>
        <button
          onClick={togglePlay}
          className="bg-white text-black rounded-full p-3"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <FaForward color="gray"/>
        </div>
       <button onClick={toggleVolume} >
        {valumeOn ? <BsFillVolumeUpFill /> :  <BsFillVolumeMuteFill/>}
       </button>
      </div>

      <audio ref={audioRef} src={song.song} />
      </div> */}
    </div>
  );
}
