import { useState } from "react";
import { database, storage } from "@/lib/appwrite/config";
import { AiOutlineClose } from "react-icons/ai";

function AddSong({ modalOpen, closeModal }) {
  const [title, setTitle] = useState("[song title] - Anto");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true); // Zet laden aan het begin van de functie
    try {
      // Upload de afbeelding en het audiobestand en krijg hun ID's
      const imageId = await uploadImage(imageFile);
      const audiofileId = await uploadAudio(audioFile);

      // Maak nu het document in de collectie met de verkregen ID's
      const songResult = await database.createDocument(
        databaseId,
        collectionId,
        "unique()", // Dit zorgt voor een unieke ID voor het document
        {
          title: title,
          "image-id": imageId,
          "audiofile-id": audiofileId,
        },
        [],
        []
      );

      alert("Het nummer is toegevoegd!");
      window.location.reload();
    } catch (error) {
      console.error(
        "Er is een fout opgetreden bij het toevoegen van het nummer:",
        error
      );
    } finally {
      setLoading(false); // Zet laden uit aan het einde van de functie
    }
  }

  return (
    <form className="flex flex-col justify-center items-center gap-4 fixed bg_background dark:bg-background_dark z-10 shadow-lg shadow-primary border-2 rounded-lg p-5">
      <div className="flex justify-between w-full">
        <h2 className="text-center dark:text-white text-black text-3xl font-bold font-main">
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
        <label>
          Titel: <br />
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
        <label>
          Afbeelding:
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
        <label>
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
        className="btn-secondary btn text-normal"
        disabled={loading}
        onClick={() => {
          if (!loading) {
            addSong(title, image, audio);
          }
        }}
      >
        {loading ? (
          <>
            <span class="loading loading-spinner loading-xs"></span>
            Loading...
          </>
        ) : (
          "Add song"
        )}
      </button>
    </form>
  );
}

export default AddSong;
