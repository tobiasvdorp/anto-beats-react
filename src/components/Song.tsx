import { AiOutlineDelete } from "react-icons/ai";

const Song = ({
  song,
  index,
  changeSong,
  isPlaying,
  currentSongIndex,
  formatTime,
  songDurations,
  deleteSong,
}) => {
  return (
    <>
      <div className="flex items-center gap-1">
        <button
          key={song.id}
          onClick={() => changeSong(index)}
          className={`flex bg-white dark:bg-background_dark flex-row items-center text-white justify-between w-full p-4 border-2 border-primary hover:bg-primary duration-300 rounded-lg hover:-translate-y-1 hover:translate-x-1 hover:origin-top hover:font-semibold ${
            currentSongIndex === index && isPlaying ? "playing" : ""
          }`}
        >
          {/* Afbeelding */}
          <img
            src={song.image}
            alt={`Cover van ${song.title}`}
            className="w-12 h-12 mr-4 object-cover rounded-full" // Stel de gewenste afmetingen in
          />

          <span className="text-black dark:text-white ">{song.title}</span>
          <span className="text-black dark:text-white">
            {songDurations[song.id] && formatTime(songDurations[song.id])}
          </span>
        </button>{" "}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Voorkom dat de changeSong functie wordt aangeroepen
            deleteSong(song.id);
          }}
          className="btn btn-secondary p-0 w-12"
        >
          <AiOutlineDelete className="text-3xl" />
        </button>
      </div>
    </>
  );
};

export default Song;
