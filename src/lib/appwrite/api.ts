import { database, account } from "@/lib/appwrite/config";

// Zorg ervoor dat je de juiste environment variabelen hebt geïmporteerd
const songsCollectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;
const aboutmeCollectionId = import.meta.env.VITE_APPWRITE_ABOUTME_COLLECTION_ID;
const galleryCollectionId = import.meta.env.VITE_APPWRITE_GALLERY_COLLECTION_ID;

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
export async function getAllContent() {
  try {
    const contentMap = {};

    // Ophalen van 'About Me' secties
    const aboutMeSections = await database.listDocuments(
      databaseId,
      aboutmeCollectionId
    );

    // Voeg de 'About Me' secties toe aan de contentMap, inclusief de document ID's
    contentMap["about_me"] = aboutMeSections.documents.map((doc) => ({
      $id: doc.$id, // Voeg de document ID toe
      title: doc.title,
      paragraph: doc.paragraph,
    }));

    return contentMap;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
}

export async function updateAboutMeCard(
  cardId: string,
  title: string,
  paragraph: string
) {
  try {
    const updatedCard = await database.updateDocument(
      databaseId,
      aboutmeCollectionId,
      cardId,
      {
        title,
        paragraph,
      }
    );

    return updatedCard;
  } catch (error) {
    console.error("Error updating card:", error);
    throw error;
  }
}

export const fetchGalleryImages = async () => {
  try {
    const response = await database.listDocuments(
      databaseId,
      galleryCollectionId
    );
    return response.documents;
  } catch (error) {
    console.error("Fout bij het ophalen van afbeeldingen:", error);
    return [];
  }
};
