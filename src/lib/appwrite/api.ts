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

    // Ophalen van de 'About Me' sectie
    const aboutMeSections = await database.listDocuments(
      databaseId,
      aboutmeCollectionId
    );

    // Voeg de 'About Me' sectie toe aan de contentMap, inclusief de document ID
    // Aannemend dat er slechts één 'About Me' sectie is
    const aboutMeSection = aboutMeSections.documents[0] || {};
    contentMap["about_me"] = {
      $id: aboutMeSection.$id, // Voeg de document ID toe
      title: aboutMeSection.title,
      paragraph: aboutMeSection.paragraph,
    };

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

export async function getAboutMeImage() {
  const aboutMeImageBucketId = "656df524275cb779e650";
  const aboutMeImageId = "656df53274316b0aa4a2";

  try {
    const image = await storage.getFileView(
      aboutMeImageBucketId,
      aboutMeImageId
    );

    return image;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}

export const fetchGalleryImages = async () => {
  try {
    const response = await storage.listFiles(galleryBucketId);
    return response.files.map((file) => ({
      $id: file.$id,
      imageurl: `https://cloud.appwrite.io/v1/storage/buckets/${galleryBucketId}/files/${file.$id}/view?project=${projectId}&mode=admin`,
    }));
  } catch (error) {
    console.error("Fout bij het ophalen van afbeeldingen:", error);
    return [];
  }
};

export const addGalleryImage = async (file: File) => {
  try {
    // Upload de foto naar de bucket
    const uploadResult = await storage.createFile(
      galleryBucketId,
      "unique()", // Laat Appwrite een unieke file ID genereren
      file
    );

    return uploadResult.$id; // Geef het file ID terug voor verdere referentie
  } catch (error) {
    console.error("Error adding gallery image:", error);
    throw error;
  }
};

export const deleteGalleryImage = async (fileId: string) => {
  try {
    await storage.deleteFile(galleryBucketId, fileId);
    console.log("Image deleted");
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    throw error;
  }
};
