import { useState, useRef } from "react";
import { database, storage } from "@/lib/appwrite/config";
import { CiImageOn } from "react-icons/ci";
import { VoidFunction, ChangeEventHandler } from "@/types";
import Alert from "@/components/ui/alert";
import { PiFileAudioFill } from "react-icons/pi";

function AddSong({ closeModal }: { closeModal: VoidFunction }) {
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [audioFileName, setAudioFileName] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [title, setTitle] = useState("");
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;
  const collectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
  const audioBucketId = import.meta.env.VITE_APPWRITE_AUDIOFILES_BUCKET_ID;
  const imageBucketId = import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID;

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
  async function addSong(title: string, imageFile: File, audioFile: File) {
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
        },
        []
      );

      setShowAlert(true);
      setAlertMessage("Song added successfully! Reload the page to see it.");
      // hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="border-primary_dark w-full h-full flex flex-col justify-center items-between  bg_background dark:bg-background_dark z-10 shadow-lg  border-2 rounded-lg p-8 animate__fadeIn animate__animated animate__faster gap-2">
        {" "}
        <div className="w-full">
          <label className="text-white font-main">
            Title: <br />
            <input
              type="text"
              placeholder="Song title - Artist name"
              onChange={(e) => setTitle(e.target.value)}
              className="inputform"
            />
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
                className={`bg-secondary px-3 py-2  duration-200  ring-primary_dark  rounded-md flex items-center  gap-2 ${
                  image
                    ? "bg-green-500 text-black ring-0 hover:text-black"
                    : "text-white ring-2 hover:text-primary_dark"
                }`}
              >
                <CiImageOn className="text-xl" />{" "}
                {imageFileName || "Select image"}
              </button>
            </label>
          </div>
          <div className="">
            <label className="text-white font-main">
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
                className={`bg-secondary px-3 py-2  duration-200  ring-primary_dark  rounded-md flex items-center  gap-2 ${
                  audio
                    ? "bg-green-500 text-black ring-0 hover:text-black"
                    : "text-white ring-2 hover:text-primary_dark"
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
              alert("Please enter a title for the song.");
              return;
            }
            if (!image) {
              alert("Please select an image file.");
              return;
            }
            if (!audio) {
              alert("Please select an audio file.");
              return;
            }

            // Voer addSong uit als alle velden ingevuld zijn
            addSong(title, image, audio);
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
        {showAlert && (
          <p className="text-center text-accent pb-0">{alertMessage}</p>
        )}
      </form>

      {/* {showAlert && <Alert alertMessage={alertMessage} />} */}
    </>
  );
}

export default AddSong;
