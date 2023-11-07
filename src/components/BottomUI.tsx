import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

const BottomUI = ({
  togglePlay,
  isPlaying,
  playPreviousSong,
  playNextSong,
  duration,
  currentTime,
  setAudioTime,
  formatTime,
}) => {
  return (
    <div className="flex flex-row items-center justify-between gap-2 w-full mt-5">
      <button
        onClick={playPreviousSong}
        className=" text-white rounded-full text-3xl pb-1"
      >
        <TbPlayerTrackPrev />
      </button>

      {/* Play/pause button */}
      <button
        onClick={togglePlay}
        className=" text-white rounded-full text-4xl pb-1"
      >
        {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
      </button>

      {/* Next button */}
      <button
        onClick={playNextSong}
        className=" text-white rounded-full text-3xl pb-1"
      >
        <TbPlayerTrackNext />
      </button>

      {/* Progress bar */}
      <div className="relative w-full h-5">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => setAudioTime(e.target.value)}
          className="w-full cursor-pointer duration-300 border-none p-1 rounded-full overflow-hidden appearance-none h-[20px] bg-gradient-to-r from-secondary via-primary to-secondary"
        />
      </div>

      <p className="text-white">{formatTime(currentTime)}</p>
    </div>
  );
};

export default BottomUI;
