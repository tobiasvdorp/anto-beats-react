import { database, account } from "@/lib/appwrite/config";

// Zorg ervoor dat je de juiste environment variabelen hebt geïmporteerd
const songsCollectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;

export async function getSong(
  databaseId: string,
  songsCollectionId: string,
  songId: string
) {
  try {
    const song = await database.getDocument(
      databaseId,
      songsCollectionId,
      songId
    );
    return song; // Dit object bevat alle gegevens van het nummer, inclusief de 'liked-by' array
  } catch (error) {
    console.error("Error getting song:", error);
    throw error;
  }
}

export async function likeSong(userId: string, songId: string) {
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

const aboutmeCollectionId = import.meta.env.VITE_APPWRITE_ABOUTME_COLLECTION_ID;

export async function getAllContent() {
  try {
    const contentMap = {};

    // Ophalen van 'About Me' secties
    const aboutMeSections = await database.listDocuments(
      databaseId,
      aboutmeCollectionId
    );

    // Voeg de 'About Me' secties toe aan de contentMap
    contentMap["about_me"] = aboutMeSections.documents.map((doc) => ({
      title: doc.title,
      paragraph: doc.paragraph,
    }));

    return contentMap;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
}
