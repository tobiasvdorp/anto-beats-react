import { useState, useRef, useEffect } from "react";
import { database, storage, account } from "@/lib/appwrite/config";
import Song from "./Song";
import BottomUI from "./BottomUI";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Atropos from "atropos/react";
const AudioPlayer = ({ isHome }) => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [songDurations, setSongDurations] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await account.get();
      setUserId(user.$id);
    };

    fetchUser();
  }, []);

  const audioRef = useRef(new Audio());

  const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;
  const collectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
  const audioBucketId = import.meta.env.VITE_APPWRITE_AUDIOFILES_BUCKET_ID;

  // Voeg de imageBucketId toe
  const imageBucketId = import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID;

  // Functie om de URL van het audiobestand te krijgen
  const getAudioFileURL = (fileId: string) => {
    return storage.getFileDownload(audioBucketId, fileId);
  };
  const getDownloadableFileURL = (bucketId: string, fileId: string) => {
    return storage.getFileDownload(bucketId, fileId);
  };

  // Functie om de huidige tijd van de audio bij te werken
  const setAudioTime = (time) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    setCurrentTime(audio.currentTime);
  };

  // Haal nummers op uit de Appwrite-database
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const result = await database.listDocuments(databaseId, collectionId);
        const fetchedSongs = result.documents.map((doc) => ({
          id: doc.$id,
          title: doc.title,
          src: getAudioFileURL(doc["audiofile-id"]),
          image: doc["image-id"]
            ? getDownloadableFileURL(imageBucketId, doc["image-id"])
            : "defaultImageURL", // Voeg een default image URL toe als fallback
        }));

        setSongs(fetchedSongs);

        Promise.all(
          fetchedSongs.map((song) => {
            return new Promise((resolve) => {
              const audio = new Audio();
              audio.src = song.src;
              audio.addEventListener("loadedmetadata", () => {
                resolve({ id: song.id, duration: audio.duration });
              });
            });
          })
        )
          .then((durations) => {
            const newSongDurations = {};
            durations.forEach((songDuration) => {
              newSongDurations[songDuration.id] = songDuration.duration;
            });
            setSongDurations(newSongDurations);
          })
          .catch((error) => {
            console.error("Error loading song durations:", error);
          });
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [databaseId, collectionId, audioBucketId, imageBucketId]); // Voeg imageBucketId toe aan de dependency array

  // Speel audio af of pauzeer
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Wanneer het huidige nummer verandert, update de bron van het audio-element
  useEffect(() => {
    if (songs.length > 0) {
      audioRef.current.src = songs[currentSongIndex].src;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing song:", error);
        });
    }
  }, [currentSongIndex, songs]);

  // Ga naar het volgende nummer
  const playNextSong = () => {
    let nextSongIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextSongIndex);
  };

  // Ga naar het vorige nummer
  const playPreviousSong = () => {
    let prevSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevSongIndex);
  };

  // Formatteer tijd voor weergave
  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Als de component unmount, zorg ervoor dat de audio stopt
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      setIsPlaying(false);
    };
  }, []);

  // Voeg event listeners toe voor het bijwerken van de huidige tijd en het afspelen van het volgende nummer
  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", () =>
      setCurrentTime(audio.currentTime)
    );
    audio.addEventListener("ended", playNextSong);

    // Verwijder de event listeners wanneer de component unmounts
    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", () =>
        setCurrentTime(audio.currentTime)
      );
      audio.removeEventListener("ended", playNextSong);
    };
  }, [currentSongIndex, songs.length]);
  const deleteSong = async (songId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this song?"
    );
    if (!confirmed) return;

    try {
      await database.deleteDocument(databaseId, collectionId, songId);
      setSongs(songs.filter((song) => song.id !== songId));
    } catch (err) {
      console.error("Error deleting song:", err.message);
    }
  };

  return (
    <div className="w-full mt-4 rounded-lg max-w-3xl bg-secondary_dark  items-center justify-center flex flex-col p-5 mx-2 border-2 border-primary max-h-[90vh] ">
      <div className="flex items-start justify-between w-full">
        <FaAngleLeft className="text-2xl rotate-45" />
        <h2 className="text-white text-4xl font-main font-bold pb-4">
          MusicPlayer
        </h2>{" "}
        <FaAngleRight className="text-2xl -rotate-45" />
      </div>
      <div className=" bg-black w-full overflow-y-scroll min-h-[20vh] max-h-[55vh] border-2 border-primary px-1  ">
        {" "}
        {songs.map((song, index) => (
          <Song
            key={song.id}
            song={song}
            index={index}
            changeSong={setCurrentSongIndex}
            isPlaying={isPlaying}
            currentSongIndex={currentSongIndex}
            formatTime={formatTime}
            songDurations={songDurations}
            deleteSong={deleteSong}
            userId={userId}
            isHome={isHome}
          />
        ))}
        {/* If there are no songs, show loader */}
        {songs.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <span className="loading loading-lg"></span>
          </div>
        )}
      </div>
      <h3 className="text-white text-xl font-normal mt-5">
        {songs.length > 0 ? (
          `${songs[currentSongIndex].title}`
        ) : (
          <>
            <span className="loading loading-spinner loading-xs"></span>
          </>
        )}
      </h3>
      <BottomUI
        togglePlay={togglePlay}
        isPlaying={isPlaying}
        playPreviousSong={playPreviousSong}
        playNextSong={playNextSong}
        duration={duration}
        currentTime={currentTime}
        setAudioTime={setAudioTime}
        formatTime={formatTime}
      />
    </div>
    // </Atropos>
    // </div>
  );
};

export default AudioPlayer;
