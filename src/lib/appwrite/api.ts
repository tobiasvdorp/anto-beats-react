import { database } from "@/lib/appwrite/config";

// Zorg ervoor dat je de juiste environment variabelen hebt geïmporteerd
const songsCollectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;

export async function likeSong(songId) {
  try {
    // Controleer of songId een geldige waarde heeft
    if (!songId) {
      throw new Error("Geen geldig songId opgegeven.");
    }

    // Haal eerst het huidige nummer op om het aantal likes te krijgen
    const song = await database.getDocument(
      databaseId,
      songsCollectionId,
      songId
    );

    // Verhoog het aantal likes met 1
    const updatedLikes = song.likes + 1;

    // Update het document met het nieuwe aantal likes
    const updatedSong = await database.updateDocument(
      databaseId,
      songsCollectionId,
      songId,
      { likes: updatedLikes }
    );

    return updatedSong;
  } catch (error) {
    console.error("Error in likeSong:", error);
    throw error; // Gooi de fout zodat deze kan worden afgehandeld in de UI
  }
}
