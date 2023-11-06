import { useState } from "react";
import { database, storage } from "@/lib/appwrite/config";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
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

  const addSong = async (title, imageFile, audioFile) => {
    try {
      // Upload de afbeelding naar de 'images' bucket
      const imageResult = await storage.createFile(
        imageBucketId,
        "unique()",
        imageFile
      );
      const imageUrl = imageResult.$id; // Of de juiste property voor de URL

      // Upload het audiobestand naar de 'audiofiles' bucket
      const audioResult = await storage.createFile(
        audioBucketId,
        "unique()",
        audioFile
      );
      const audioUrl = audioResult.$id; // Of de juiste property voor de URL

      // Voeg het nieuwe nummer toe aan de 'songs' collectie
      const songResult = await database.createDocument(
        databaseId,
        collectionId,
        "unique()",
        {
          title,
          imageUrl,
          audioUrl,
        }
      );

      // Hier kun je verder gaan met de verwerking, zoals het weergeven van een succesmelding
    } catch (error) {
      // Verwerk de fout, bijvoorbeeld door een foutmelding weer te geven
      console.error(
        "Er is een fout opgetreden bij het toevoegen van het nummer:",
        error
      );
    }
  };

  return (
    <div className=" ">
      <h1>Admin Panel</h1>
      <form className="flex flex-col justify-center items-center w-full h-screen gap-4">
        <div>
          <label>
            Titel:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Afbeelding:
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Audio:
            <input
              type="file"
              onChange={handleAudioChange}
              accept="audio/*"
              required
            />
          </label>
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={() => addSong(title, image, audio)}
        >
          {loading ? "Laden..." : "Voeg Toe"}
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
