import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Importeer het harticoon voor de like-knop
import { likeSong, getSong } from "@/lib/appwrite/api"; // Zorg ervoor dat je een functie hebt om een nummer op te halen
import { FaSpotify, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Song = ({
  song,
  userId,
  index,
  changeSong,
  isPlaying,
  currentSongIndex,
  formatTime,
  songDurations,
  deleteSong,
  isAdmin,
}) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;
  const songsCollectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const fetchedSong = await getSong(
          databaseId,
          songsCollectionId,
          song.id
        );
        if (fetchedSong && Array.isArray(fetchedSong["liked-by"])) {
          setLikes(fetchedSong["liked-by"].length);
          // Controleer of de gebruiker het nummer al heeft geliket
          const userHasLiked = fetchedSong["liked-by"].includes(userId);
          // Gebruik het resultaat van de controle om de hasLiked state in te stellen
          setHasLiked(userHasLiked);
        }
      } catch (error) {
        console.error("Kon de song data niet ophalen:", error);
      }
    };

    fetchSongData();
  }, [song.id, userId]);

  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true); // Start de loading state

    if (!userId) {
      navigate("/sign-in");
      return;
    }
    try {
      if (typeof song.id === "string") {
        const updatedSong = await likeSong(userId, song.id);
        setLikes(updatedSong["liked-by"].length); // Update de likes state met het aantal gebruikers die geliket hebben
        setHasLiked(updatedSong["liked-by"].includes(userId)); // Gebruik de prop `userId` hier
      } else {
        throw new Error("Song ID is ongeldig of ontbreekt");
      }
    } catch (error) {
      console.error("Error in handleLike:", error);
    } finally {
      setIsLoading(false); // Eindig de loading state ongeacht het resultaat
    }
  };

  return (
    <div className="flex bg-gray-400 group items-center dark:bg-background_dark bg-gradient-to-l dark:from-background_dark dark:to-background_dark dark:via-background_dark_third">
      <button
        key={song.id}
        onClick={() => changeSong(index)}
        className={`flex flex-row  items-center my-1 text-white justify-between w-full xs:px-4 px-1 py-3 hover:ring-2 ring-0 ring-transparent hover:ring-primary hover:bg-primary/30 duration-300 rounded-lg hover:-translate-y-1 hover:translate-x-1 hover:origin-top hover:font-semibold shadow-primary ${
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
          loading="lazy"
          alt={`Cover van ${song.title}`}
          className={`xs:w-16 xs:h-16 h-12 w-12 xs:mr-4 mr-1 object-cover rounded-md ${
            !isImageLoaded ? "hidden" : ""
          }`} // Verberg de afbeelding tot deze geladen is
          onLoad={() => setIsImageLoaded(true)} // Zet de state op true wanneer de afbeelding geladen is
        />

        <span className="text-black dark:text-white pl-2 text-left w-full ">
          {song.title}
        </span>
        {/* If there is no URL, dont show icons */}
        <div className="flex gap-2 mr-3">
          {song.spotify && (
            <a
              href={song.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent_dark text-xl"
            >
              <FaSpotify />
            </a>
          )}
          {song.youtube && (
            <a
              href={song.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CD201F] text-xl"
            >
              <FaYoutube />
            </a>
          )}
        </div>

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
            {isLoading ? (
              // Toon een loader icoon of animatie
              <span className="loading loading-spinner loading-xs text-accent_dark"></span>
            ) : hasLiked ? (
              <AiFillHeart className="text-accent_dark " />
            ) : (
              <AiOutlineHeart className="text-accent_dark " />
            )}
            <span>{likes}</span>
          </div>
        </div>
      </button>
      {isAdmin && (
        <div
          onClick={(e) => {
            e.stopPropagation(); // Voorkom dat de changeSong functie wordt aangeroepen
            deleteSong(song.id);
          }}
          className="btn btn-secondary p-0 min-h-0 h-10 mx-0 group-hover:mr-1 group-hover:ml-2  w-0 group-hover:w-10 flex  items-center justify-center duration-300"
        >
          <AiOutlineDelete className="text-2xl" />
        </div>
      )}
    </div>
  );
};

export default Song;
