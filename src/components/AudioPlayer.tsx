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
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="mt-2 -z-10"
        >
          <path
            className="bg-black"
            fill-opacity="1"
            d="M0,224L6.2,229.3C12.3,235,25,245,37,208C49.2,171,62,85,74,69.3C86.2,53,98,107,111,154.7C123.1,203,135,245,148,261.3C160,277,172,267,185,240C196.9,213,209,171,222,176C233.8,181,246,235,258,256C270.8,277,283,267,295,256C307.7,245,320,235,332,197.3C344.6,160,357,96,369,106.7C381.5,117,394,203,406,218.7C418.5,235,431,181,443,138.7C455.4,96,468,64,480,48C492.3,32,505,32,517,53.3C529.2,75,542,117,554,133.3C566.2,149,578,139,591,117.3C603.1,96,615,64,628,80C640,96,652,160,665,202.7C676.9,245,689,267,702,277.3C713.8,288,726,288,738,288C750.8,288,763,288,775,272C787.7,256,800,224,812,218.7C824.6,213,837,235,849,250.7C861.5,267,874,277,886,234.7C898.5,192,911,96,923,90.7C935.4,85,948,171,960,176C972.3,181,985,107,997,85.3C1009.2,64,1022,96,1034,112C1046.2,128,1058,128,1071,112C1083.1,96,1095,64,1108,80C1120,96,1132,160,1145,154.7C1156.9,149,1169,75,1182,69.3C1193.8,64,1206,128,1218,154.7C1230.8,181,1243,171,1255,154.7C1267.7,139,1280,117,1292,128C1304.6,139,1317,181,1329,202.7C1341.5,224,1354,224,1366,224C1378.5,224,1391,224,1403,224C1415.4,224,1428,224,1434,224L1440,224L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z"
          ></path>
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
