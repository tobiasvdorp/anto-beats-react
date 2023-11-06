const Song = ({
  song,
  index,
  changeSong,
  isPlaying,
  currentSongIndex,
  formatTime,
  songDurations,
}) => {
  return (
    <button
      key={song.id}
      onClick={() => changeSong(index)}
      className={`flex flex-row items-center text-white justify-between w-full p-4 border-2 border-primary hover:bg-primary duration-300 rounded-lg hover:-translate-y-1 hover:translate-x-1 hover:origin-top hover:font-semibold ${
        currentSongIndex === index && isPlaying ? "playing" : ""
      }`}
    >
      {/* Afbeelding */}
      <img
        src={song.image}
        alt={`Cover van ${song.title}`}
        className="w-12 h-12 mr-4 object-cover rounded-full" // Stel de gewenste afmetingen in
      />
      <div className="flex flex-col">
        <span>{song.title}</span>
        <span className="text-white">
          {songDurations[song.id] && formatTime(songDurations[song.id])}
        </span>
      </div>
    </button>
  );
};

export default Song;
