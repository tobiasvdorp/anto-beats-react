import React, { useState, useRef, useEffect } from "react";
import { database, storage } from "@/lib/appwrite/config";
import Song from "./Song"; // Zorg ervoor dat dit pad klopt
import BottomUI from "./BottomUI"; // Zorg ervoor dat dit pad klopt

const AudioPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [songDurations, setSongDurations] = useState({}); // Als dit een object is met song ID's als keys en durations als values

  const audioRef = useRef(new Audio());

  const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;
  const collectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
  const audioBucketId = import.meta.env.VITE_APPWRITE_AUDIOFILES_BUCKET_ID;

  // Voeg de imageBucketId toe
  const imageBucketId = import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID;

  // Functie om de URL van het audiobestand te krijgen
  const getAudioFileURL = (fileId) => {
    return storage.getFileDownload(audioBucketId, fileId);
  };
  const getDownloadableFileURL = (bucketId, fileId) => {
    return storage.getFileDownload(bucketId, fileId);
  };

  // Functie om de URL van de afbeelding te krijgen
  const getImageFileURL = (fileId) => {
    // Gebruik getFilePreview of getFileDownload afhankelijk van je behoefte
    return storage.getFilePreview(imageBucketId, fileId);
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

  return (
    <div className="w-[95vw] rounded-lg max-w-xl bg-secondary  items-center justify-center flex flex-col p-5">
      {" "}
      <div className="bg-black w-full overflow-y-scroll max-h-80">
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
          />
        ))}
      </div>
      <h3 className="text-white text-xl font-normal mt-5">
        {songs.length > 0
          ? `${songs[currentSongIndex].title} - Anto`
          : "Geen nummer afspelend"}
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
  );
};

export default AudioPlayer;
