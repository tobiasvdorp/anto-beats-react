import { useState } from "react";
import { database, storage } from "@/lib/appwrite/config";
import { AiOutlineClose } from "react-icons/ai";

import Alert from "@/components/ui/alert";
function AddSong({ closeModal }) {
  const [title, setTitle] = useState("[song title] - Anto");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;
  const collectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
  const audioBucketId = import.meta.env.VITE_APPWRITE_AUDIOFILES_BUCKET_ID;
  const imageBucketId = import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };

  // Functie om een afbeeldingsbestand te uploaden
  async function uploadImage(file) {
    try {
      const result = await storage.createFile(imageBucketId, "unique()", file);
      return result.$id; // De ID van het geüploade bestand
    } catch (error) {
      console.error("Fout bij het uploaden van de afbeelding:", error);
      throw error; // Gooi de fout zodat je deze kunt afhandelen
    }
  }

  // Functie om een audiobestand te uploaden
  async function uploadAudio(file) {
    try {
      const result = await storage.createFile(audioBucketId, "unique()", file);
      return result.$id; // De ID van het geüploade bestand
    } catch (error) {
      console.error("Fout bij het uploaden van het audiobestand:", error);
      throw error; // Gooi de fout zodat je deze kunt afhandelen
    }
  }

  // Aangepaste addSong functie
  async function addSong(title, imageFile, audioFile) {
    setLoading(true);
    try {
      const imageId = await uploadImage(imageFile);
      const audiofileId = await uploadAudio(audioFile);

      const songResult = await database.createDocument(
        databaseId,
        collectionId,
        "unique()",
        {
          title: title,
          "image-id": imageId,
          "audiofile-id": audiofileId,
        },
        [],
        []
      );

      setShowAlert(true);
      setAlertMessage("Song added successfully! Reload the page to see it.");
      // hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="flex flex-col justify-center items-center gap-4 fixed bg_background dark:bg-background_dark z-10 shadow-lg shadow-primary border-2 rounded-lg p-5 animate__fadeIn animate__animated animate__faster">
        {" "}
        <div className="flex justify-between w-full">
          <h2 className="text-center dark:text-white text-black text-3xl font-bold font-main pb-5">
            Add song
          </h2>{" "}
          <button
            onClick={closeModal}
            className="bg-primary text-black btn btn-secondary p-2 min-h-0 h-8"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="w-full">
          <label className="text-white">
            Title: <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="inputform"
            />
          </label>
        </div>
        <div>
          <label className="text-white">
            Image:
            <br />
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required
              className="bg-secondary p-2 text-white rounded-md"
            />
          </label>
        </div>
        <div>
          <label className="text-white">
            Audio:
            <br />
            <input
              type="file"
              onChange={handleAudioChange}
              accept="audio/*"
              required
              className="bg-secondary p-2 text-white rounded-md"
            />
          </label>
        </div>
        <button
          type="button"
          className="btn-secondary btn text-normal mt-5"
          disabled={loading}
          onClick={() => {
            if (!loading) {
              addSong(title, image, audio);
            }
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

      {showAlert && <Alert showAlert={showAlert} alertMessage={alertMessage} />}
    </>
  );
}

export default AddSong;
