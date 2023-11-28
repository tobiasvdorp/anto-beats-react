import { database, account, storage } from "@/lib/appwrite/config";

// Zorg ervoor dat je de juiste environment variabelen hebt geïmporteerd
const songsCollectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;
const aboutmeCollectionId = import.meta.env.VITE_APPWRITE_ABOUTME_COLLECTION_ID;
const galleryCollectionId = import.meta.env.VITE_APPWRITE_GALLERY_COLLECTION_ID;
const galleryBucketId = import.meta.env.VITE_APPWRITE_GALLERY_BUCKET_ID;
const projectId = import.meta.env.VITE_APP_APPWRITE_PROJECT_ID;

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

export const addGalleryImage = async (file: File) => {
  try {
    const uploadResult = await storage.createFile(
      galleryBucketId,
      "unique()",
      file
    );

    // Update de URL om de project-ID en toegangsmodus te bevatten
    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${galleryBucketId}/files/${uploadResult.$id}/view?project=${projectId}&mode=admin`;

    await database.createDocument(
      databaseId,
      galleryCollectionId,
      "unique()", // Unieke document ID
      {
        id: "unique()", // Zorg ervoor dat dit overeenkomt met de structuur van je collectie
        imageurl: imageUrl,
      }
    );
    return uploadResult.$id;
  } catch (error) {
    console.error("Error adding gallery image:", error);
    throw error;
  }
};

export const deleteGalleryImage = async (
  documentId: string,
  fileId: string
) => {
  try {
    console.log("Deleting document", documentId, "and file", fileId);
    // Verwijder eerst het document uit de database
    await database.deleteDocument(databaseId, galleryCollectionId, documentId);

    // Verwijder vervolgens het bestand uit de opslag
    await storage.deleteFile(galleryBucketId, fileId);

    alert("Afbeelding verwijderd");
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    throw error;
  }
};
