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
    <div className="flex flex-col md:flex-row  items-center justify-between gap-2 w-full mt-2 md:mt-5 md:h-10 h-24">
      <div className="flex flex-row flex-nowrap h-24">
        <button
          onClick={playPreviousSong}
          className=" text-white rounded-full text-4xl md:text-3xl pb-1 duration-200 "
        >
          <TbPlayerTrackPrev className="hover:text-accent_dark duration-200" />
        </button>

        {/* Play/pause button */}
        <button
          onClick={togglePlay}
          className=" text-white rounded-full text-6xl md:text-5xl  pb-1  duration-200"
        >
          {isPlaying ? (
            <BsFillPauseFill className="hover:text-accent_dark duration-200" />
          ) : (
            <BsFillPlayFill className="hover:text-accent_dark duration-200" />
          )}
        </button>

        {/* Next button */}
        <button
          onClick={playNextSong}
          className=" text-white rounded-full text-4xl md:text-3xl pb-1  duration-200"
        >
          <TbPlayerTrackNext className="hover:text-accent_dark duration-200" />
        </button>
      </div>
      {/* Progress bar */}
      <div className="relative w-full h-5 flex flex-nowrap items-center justify-end gap-4">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => setAudioTime(e.target.value)}
          className="w-full cursor-pointer duration-300 border-none p-1 rounded-full overflow-hidden appearance-none h-[20px] bg-gradient-to-r from-accent_dark via-primary to-accent_dark"
        />
        <p className="text-white">{formatTime(currentTime)}</p>
      </div>
    </div>
  );
};

export default BottomUI;
