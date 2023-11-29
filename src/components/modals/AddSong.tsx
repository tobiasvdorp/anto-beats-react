import { useState, useRef } from "react";
import { database, storage } from "@/lib/appwrite/config";
import { CiImageOn } from "react-icons/ci";
import { useAlert } from "../ui/AlertProvider";
import { PiFileAudioFill } from "react-icons/pi";

function AddSong({
  closeModal,
  updateSongs,
}: {
  closeModal: VoidFunction;
  updateSongs: () => void;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [audioFileName, setAudioFileName] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [title, setTitle] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;
  const collectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
  const audioBucketId = import.meta.env.VITE_APPWRITE_AUDIOFILES_BUCKET_ID;
  const imageBucketId = import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID;

  const { showAlert } = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFileName(file.name);
      setImage(file);
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFileName(file.name);
      setAudio(file);
    }
  };

  // Functie om een afbeeldingsbestand te uploaden
  async function uploadImage(file: File) {
    try {
      const result = await storage.createFile(imageBucketId, "unique()", file);
      return result.$id; // De ID van het geüploade bestand
    } catch (error) {
      console.error("Fout bij het uploaden van de afbeelding:", error);
      throw error; // Gooi de fout zodat je deze kunt afhandelen
    }
  }

  // Functie om een audiobestand te uploaden
  async function uploadAudio(file: File) {
    try {
      const result = await storage.createFile(audioBucketId, "unique()", file);
      return result.$id; // De ID van het geüploade bestand
    } catch (error) {
      console.error("Fout bij het uploaden van het audiobestand:", error);
      throw error; // Gooi de fout zodat je deze kunt afhandelen
    }
  }

  // Aangepaste addSong functie
  async function addSong(
    title: string,
    imageFile: File,
    audioFile: File,
    spotifyUrl: string,
    youtubeUrl: string
  ) {
    setLoading(true);
    try {
      const imageId = await uploadImage(imageFile);
      const audiofileId = await uploadAudio(audioFile);

      await database.createDocument(
        databaseId,
        collectionId,
        "unique()",
        {
          title: title,
          "image-id": imageId,
          "audiofile-id": audiofileId,
          spotify_url: spotifyUrl,
          youtube_url: youtubeUrl,
        },
        []
      );
      closeModal();
      updateSongs();
      showAlert("Song added successfully!", "success");
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error.message, "error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="border-primary_dark w-full h-full  flex flex-col justify-center items-between  bg_background dark:bg-background_dark z-10 shadow-lg  border-2 rounded-lg p-8 animate__fadeIn animate__animated animate__faster gap-2">
        {" "}
        <div className="w-full">
          <label className="text-white font-main">
            Title*: <br />
            <input
              type="text"
              placeholder="Song title - Artist name"
              onChange={(e) => setTitle(e.target.value)}
              className="inputform"
            />
          </label>
        </div>
        {/* Spotify and youtube urls */}
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-white font-main">
            Spotify URL (optional): <br />
            <input
              type="text"
              placeholder="https://open.spotify.com/track/..."
              onChange={(e) => setSpotifyUrl(e.target.value)}
              className="inputform"
            />
          </label>

          <label className="text-white font-main">
            Youtube URL (optional):
            <br />
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="inputform"
            ></input>
          </label>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <div className="">
            <label className="text-white font-main">
              <br />
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                required
                className="hidden"
                ref={imageInputRef}
              />
              <button
                onClick={() =>
                  imageInputRef.current && imageInputRef.current.click()
                }
                className={` px-3 py-2  duration-200  ring-primary_dark  rounded-md flex items-center  gap-2 ${
                  image && imageFileName
                    ? "text-black ring-0  bg-accent_dark hover:ring-2"
                    : "bg-secondary ring-2 text-white hover:text-primary_dark"
                }`}
              >
                <CiImageOn className="text-xl" />{" "}
                {imageFileName || "Select image"}
              </button>
            </label>
          </div>
          <div className=" h-fit">
            <label className="text-white font-main ">
              <br />
              <input
                type="file"
                onChange={handleAudioChange}
                accept="audio/*"
                required
                className="hidden"
                ref={audioInputRef}
              />
              <button
                onClick={() =>
                  audioInputRef.current && audioInputRef.current.click()
                }
                className={` px-3 py-2  duration-200  ring-primary_dark  rounded-md flex items-center  gap-2 ${
                  audio && audioFileName
                    ? "text-black ring-0  bg-accent_dark hover:ring-2"
                    : "bg-secondary ring-2 text-white hover:text-primary_dark"
                }`}
              >
                {" "}
                <PiFileAudioFill className="text-xl" />{" "}
                {audioFileName || "Select audio"}
              </button>
            </label>
          </div>
        </div>
        <button
          type="button"
          className="btn-secondary btn text-normal mt-5"
          disabled={loading}
          onClick={() => {
            if (loading) return;

            if (!title) {
              showAlert("Please enter a title.", "warning");
              return;
            }
            if (!image) {
              showAlert("Please select an image.", "warning");
              return;
            }
            if (!audio) {
              showAlert("Please select an audio file.", "warning");
              return;
            }

            // Voer addSong uit als alle velden ingevuld zijn
            addSong(title, image, audio, spotifyUrl, youtubeUrl);
          }}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Loading...
            </>
          ) : (
            "Add song"
          )}
        </button>
      </form>
    </>
  );
}

export default AddSong;
