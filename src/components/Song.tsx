import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Importeer het harticoon voor de like-knop
import { likeSong } from "@/lib/appwrite/api";

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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [likes, setLikes] = useState(
    song["liked-by"] ? song["liked-by"].length : 0
  );

  const [hasLiked, setHasLiked] = useState(
    song["liked-by"] && song["liked-by"].includes("6544fc6d0f3d1100ed33")
  );

  const handleLike = async () => {
    try {
      // Vervang 'userId' met de daadwerkelijke ID van de ingelogde gebruiker
      const userId = "6544fc6d0f3d1100ed33"; // Dit moet je ophalen uit de gebruikerssessie of context

      if (typeof song.id === "string") {
        const updatedSong = await likeSong(userId, song.id);
        setLikes(updatedSong["liked-by"].length); // Update de likes state met het aantal gebruikers die geliket hebben
        setHasLiked(updatedSong["liked-by"].includes("6544fc6d0f3d1100ed33"));
      } else {
        throw new Error("Song ID is ongeldig of ontbreekt");
      }
    } catch (error) {}
  };

  return (
    <div className="flex items-center gap-1">
      <button
        key={song.id}
        onClick={() => changeSong(index)}
        className={`flex flex-row items-center text-white justify-between w-full px-4 py-3 border-2 border-primary hover:bg-primary duration-300 rounded-lg hover:-translate-y-1 hover:translate-x-1 hover:origin-top hover:font-semibold ${
          currentSongIndex === index && isPlaying ? "playing" : ""
        }`}
      >
        {/* Placeholder afbeelding */}
        {!isImageLoaded && (
          <div
            role="status"
            className="flex items-center justify-center h-full max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
          >
            <svg
              className="w-16 h-16 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            ></svg>
          </div>
        )}
        {/* Echte afbeelding */}
        <img
          src={song.image}
          alt={`Cover van ${song.title}`}
          className={`w-16 h-16 mr-4 object-cover rounded-md ${
            !isImageLoaded ? "hidden" : ""
          }`} // Verberg de afbeelding tot deze geladen is
          onLoad={() => setIsImageLoaded(true)} // Zet de state op true wanneer de afbeelding geladen is
        />

        <span className="text-black dark:text-white ">{song.title}</span>
        <div className="flex flex-col items-center justify-center">
          <span className="text-black dark:text-white">
            {songDurations[song.id] && formatTime(songDurations[song.id])}
          </span>
          <div
            onClick={(e) => {
              e.stopPropagation(); // Voorkom dat de changeSong functie wordt aangeroepen
              handleLike();
            }}
            className="flex items-center gap-1"
          >
            {/* Gebruik de hasLiked state om te bepalen welk icoon getoond moet worden */}
            {hasLiked ? (
              <AiFillHeart className="text-red-500 " />
            ) : (
              <AiOutlineHeart className="text-red-500 " />
            )}
            <span>{likes}</span>
          </div>
        </div>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Voorkom dat de changeSong functie wordt aangeroepen
          deleteSong(song.id);
        }}
        className="btn btn-secondary p-0 mr-1 w-12"
      >
        <AiOutlineDelete className="text-3xl" />
      </button>
    </div>
  );
};

export default Song;
