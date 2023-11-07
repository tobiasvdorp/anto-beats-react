import { database } from "@/lib/appwrite/config";

// Zorg ervoor dat je de juiste environment variabelen hebt geïmporteerd
const songsCollectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;
export async function likeSong(userId, songId) {
  try {
    const song = await database.getDocument(
      databaseId,
      songsCollectionId,
      songId
    );

    // Zorg ervoor dat song['liked-by'] een array is
    const likedByArray = Array.isArray(song["liked-by"])
      ? song["liked-by"]
      : [];

    // Controleer of de gebruiker het nummer al heeft geliket
    const hasLiked = likedByArray.includes(userId);
    let updatedLikedBy;

    if (hasLiked) {
      // Als de gebruiker al heeft geliket, verwijder de like
      updatedLikedBy = likedByArray.filter((id) => id !== userId);
    } else {
      // Als de gebruiker nog niet heeft geliket, voeg de like toe
      updatedLikedBy = [...likedByArray, userId];
    }

    // Update het nummer met de nieuwe lijst van 'liked-by'
    const updatedSong = await database.updateDocument(
      databaseId,
      songsCollectionId,
      songId,
      { "liked-by": updatedLikedBy }
    );

    return {
      ...updatedSong,
      hasLiked: !hasLiked,
    };
  } catch (error) {
    console.error("Error in likeSong:", error);
    throw error;
  }
}
