import { useState, useRef, useEffect } from "react";
import { database, storage, account } from "@/lib/appwrite/config";
import Song from "./Song";
import BottomUI from "./BottomUI";
import { SlSizeFullscreen } from "react-icons/sl";
import { BsFullscreenExit } from "react-icons/bs";
import AddSong from "./modals/AddSong";
import SongSkeleton from "./ui/SongSkeleton";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { ParallaxLayer } from "@react-spring/parallax";

const AudioPlayer = ({ isAdmin }) => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [songDurations, setSongDurations] = useState({});
  const [userId, setUserId] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
          // Youtube en spotify urls
          youtube: doc.youtube_url,
          spotify: doc.spotify_url,
          src: getAudioFileURL(doc["audiofile-id"]),
          image: doc["image-id"]
            ? getDownloadableFileURL(imageBucketId, doc["image-id"])
            : "defaultImageURL",
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ParallaxLayer offset={0.7} speed={2}>
        <svg
          viewBox="0.795 0 499.205 107.053"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="bg-background_dark stroke-accent"
            fill-opacity="1"
            d="M -4.7 74.885 L -2.509 76.528 C -0.353 78.294 4.136 81.393 8.377 69.927 C 12.69 58.46 17.214 31.807 21.455 26.941 C 25.768 21.889 29.938 38.625 34.534 53.408 C 38.81 68.377 43.017 81.393 47.611 86.445 C 51.854 91.311 56.095 88.212 60.69 79.844 C 64.895 71.476 69.172 58.46 73.768 60.009 C 77.939 61.559 82.251 78.294 86.492 84.802 C 91.016 91.311 95.328 88.212 99.57 84.802 C 104.059 81.393 108.406 78.294 112.649 66.61 C 117.102 55.05 121.485 35.215 125.726 38.531 C 130.144 41.724 134.563 68.377 138.803 73.243 C 143.222 78.294 147.64 61.559 151.882 48.449 C 156.265 35.215 160.719 25.298 164.96 20.34 C 169.308 15.381 173.796 15.381 178.038 21.982 C 182.351 28.708 186.875 41.724 191.116 46.776 C 195.427 51.641 199.598 48.542 204.194 41.816 C 208.471 35.215 212.677 25.298 217.272 30.257 C 221.513 35.215 225.755 55.05 230.35 68.284 C 234.556 81.393 238.832 88.212 243.428 91.404 C 247.599 94.72 251.912 94.72 256.152 94.72 C 260.677 94.72 264.989 94.72 269.23 89.761 C 273.719 84.802 278.066 74.885 282.309 73.243 C 286.763 71.476 291.145 78.294 295.386 83.16 C 299.804 88.212 304.222 91.311 308.464 78.201 C 312.882 64.967 317.301 35.215 321.543 33.573 C 325.925 31.807 330.38 58.46 334.621 60.009 C 338.968 61.559 343.457 38.625 347.698 31.899 C 352.01 25.298 356.534 35.215 360.776 40.174 C 365.089 45.133 369.259 45.133 373.854 40.174 C 378.131 35.215 382.337 25.298 386.932 30.257 C 391.174 35.215 395.416 55.05 400.01 53.408 C 404.216 51.641 408.492 28.708 413.089 26.941 C 417.259 25.298 421.571 45.133 425.812 53.408 C 430.336 61.559 434.65 58.46 438.89 53.408 C 443.38 48.542 447.727 41.724 451.969 45.133 C 456.422 48.542 460.806 61.559 465.047 68.284 C 469.465 74.885 473.883 74.885 478.124 74.885 C 482.542 74.885 486.96 74.885 491.203 74.885 C 495.586 74.885 500.039 74.885 502.16 74.885 L 504.28 74.885 L 504.28 104.638 L 502.09 104.638 C 499.933 104.638 495.444 104.638 491.203 104.638 C 486.889 104.638 482.365 104.638 478.124 104.638 C 473.813 104.638 469.642 104.638 465.047 104.638 C 460.769 104.638 456.563 104.638 451.969 104.638 C 447.727 104.638 443.486 104.638 438.89 104.638 C 434.684 104.638 430.408 104.638 425.812 104.638 C 421.642 104.638 417.329 104.638 413.089 104.638 C 408.564 104.638 404.252 104.638 400.01 104.638 C 395.522 104.638 391.174 104.638 386.932 104.638 C 382.477 104.638 378.096 104.638 373.854 104.638 C 369.436 104.638 365.018 104.638 360.776 104.638 C 356.358 104.638 351.939 104.638 347.698 104.638 C 343.315 104.638 338.861 104.638 334.621 104.638 C 330.273 104.638 325.784 104.638 321.543 104.638 C 317.229 104.638 312.706 104.638 308.464 104.638 C 304.152 104.638 299.981 104.638 295.386 104.638 C 291.109 104.638 286.903 104.638 282.309 104.638 C 278.066 104.638 273.826 104.638 269.23 104.638 C 265.024 104.638 260.748 104.638 256.152 104.638 C 251.982 104.638 247.669 104.638 243.428 104.638 C 238.904 104.638 234.592 104.638 230.35 104.638 C 225.861 104.638 221.513 104.638 217.272 104.638 C 212.818 104.638 208.434 104.638 204.194 104.638 C 199.776 104.638 195.358 104.638 191.116 104.638 C 186.698 104.638 182.28 104.638 178.038 104.638 C 173.654 104.638 169.202 104.638 164.96 104.638 C 160.613 104.638 156.123 104.638 151.882 104.638 C 147.57 104.638 143.045 104.638 138.803 104.638 C 134.492 104.638 130.322 104.638 125.726 104.638 C 121.449 104.638 117.243 104.638 112.649 104.638 C 108.406 104.638 104.164 104.638 99.57 104.638 C 95.365 104.638 91.087 104.638 86.492 104.638 C 82.321 104.638 78.008 104.638 73.768 104.638 C 69.243 104.638 64.932 104.638 60.69 104.638 C 56.2 104.638 51.854 104.638 47.611 104.638 C 43.158 104.638 38.774 104.638 34.534 104.638 C 30.115 104.638 25.697 104.638 21.455 104.638 C 17.037 104.638 12.619 104.638 8.377 104.638 C 3.995 104.638 -0.458 104.638 -2.58 104.638 L -4.7 104.638 L -4.7 74.885 Z"
            stroke="white"
            stroke-width="0.4"
          />
          <rect
            x="-11.989"
            y="98.036"
            width="514.848"
            height="23.621"
            className="bg-background_dark"
          />
        </svg>
        <div className="h-[300vh] bg-black 0 z-0"></div>
      </ParallaxLayer>
      <ParallaxLayer
        offset={0.99}
        factor={0.8}
        speed={1}
        className="w-full flex items-center justify-center"
      >
        <div
          className={`w-full  rounded-lg mt-40  bg-secondary_dark  items-center justify-center flex flex-col p-5 mx-2 border-2 border-primary max-h-[90vh]
    ${isFullscreen ? "mx-4 max-w-8xl" : "max-w-3xl"}
     `}
        >
          {/* {modalOpen && <AddSong closeModal={closeModal} />} */}

          <div className="flex items-start justify-between w-full relative">
            {/* If modal is open, show "add song". Else, show "Music player" */}
            {modalOpen ? (
              <h2 className="text-white text-4xl font-main font-bold pb-4 text-center w-full">
                Add song
              </h2>
            ) : (
              <h2 className="text-white text-4xl font-main font-bold pb-4 text-center w-full">
                Music player
              </h2>
            )}
            {isAdmin && (
              <>
                {modalOpen ? (
                  <button
                    className="btn btn-secondary text-md py-0 px-3 min-h-0 h-10 w-fit absolute sm:right-10 -left-2 sm:top-0 -top-10"
                    onClick={closeModal}
                  >
                    <AiOutlineClose className="text-lg" />
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary text-md py-0 px-3 min-h-0 h-10 w-fit absolute sm:right-10 -left-2 sm:top-0 -top-10"
                    onClick={openModal}
                  >
                    <AiOutlinePlus className="text-lg" />
                  </button>
                )}
              </>
            )}

            <button
              onClick={toggleFullscreen}
              className="absolute sm:right-0 -right-2 sm:top-0 -top-10 p-2 bg-accent_dark rounded-md text-black"
            >
              {isFullscreen ? (
                <BsFullscreenExit className="sm:text-2xl text-xl text-black" />
              ) : (
                <SlSizeFullscreen className="sm:text-2xl  text-xl text-black" />
              )}
            </button>
          </div>

          {/* If modalOpen is true, show AddSong. Else, show h1 */}
          {modalOpen ? (
            <AddSong closeModal={closeModal} />
          ) : (
            <div className=" bg-black w-full overflow-y-scroll min-h-[20vh] max-h-[55vh] border-2 border-primary px-1 ">
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
                  isAdmin={isAdmin}
                />
              ))}
              {/* If there are no songs, show loader */}
              {songs.length === 0 && (
                <>
                  <SongSkeleton /> <SongSkeleton />
                  <SongSkeleton /> <SongSkeleton />
                </>
              )}
            </div>
          )}
          {!modalOpen && (
            <>
              {" "}
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
            </>
          )}
        </div>
      </ParallaxLayer>
    </>
  );
};

export default AudioPlayer;
