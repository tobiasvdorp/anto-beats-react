import { useState } from "react";
import { database, storage } from "@/lib/appwrite/config";
import { AiOutlineClose } from "react-icons/ai";
import { VoidFunction, ChangeEventHandler } from "@/types";
import Alert from "@/components/ui/alert";

function AddSong({ closeModal }: { closeModal: VoidFunction }) {
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;
  const collectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
  const audioBucketId = import.meta.env.VITE_APPWRITE_AUDIOFILES_BUCKET_ID;
  const imageBucketId = import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID;

  const handleImageChange: ChangeEventHandler = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleAudioChange: ChangeEventHandler = (e) => {
    if (e.target.files) {
      setAudio(e.target.files[0]);
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
      <form className="border-primary_dark w-full h-full flex flex-col justify-center items-between  bg_background dark:bg-background_dark z-10 shadow-lg  border-2 rounded-lg p-8 animate__fadeIn animate__animated animate__faster">
        {" "}
        <div className="w-full">
          <label className="text-white font-main">
            Title: <br />
            <input
              type="text"
              placeholder="Song title - Artist name"
              onChange={(e) => setTitle(e.target.value)}
              required
              className="inputform"
            />
          </label>
        </div>
        <div className="w-full">
          <label className="text-white font-main">
            Image:
            <br />
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required
              className="bg-secondary px-3  inputform py-2 w-full text-white rounded-md "
            />
          </label>
        </div>
        <div className="w-full">
          <label className="text-white font-main">
            Audio:
            <br />
            <input
              type="file"
              onChange={handleAudioChange}
              accept="audio/*"
              required
              className="bg-secondary px-3 py-2 inputform text-white rounded-md"
            />
          </label>
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
            if (image instanceof File && audio instanceof File) {
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

      {showAlert && <Alert alertMessage={alertMessage} />}
    </>
  );
}

export default AddSong;
