import { useState, useEffect } from "react";
import { database, storage } from "@/lib/appwrite/config";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const databaseId = import.meta.env.VITE_APPWRITE_SONGS_DATABASE_ID;
  const collectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
  const audioBucketId = import.meta.env.VITE_APPWRITE_AUDIOFILES_BUCKET_ID;
  const imageBucketId = import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID;

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const result = await database.listDocuments(databaseId, collectionId);
      setSongs(result.documents);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSong = async (songId) => {
    // alert om te vragen of de gebruiker zeker is
    const confirmed = window.confirm(
      "Are you sure you want to delete this song?"
    );
    if (!confirmed) return;

    try {
      await database.deleteDocument(databaseId, collectionId, songId);
      setSongs(songs.filter((song) => song.$id !== songId));
    } catch (err) {
      setError(err.message);
    }
  };

  const getFileURL = (bucketId, fileId) => {
    return storage.getFilePreview(bucketId, fileId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const getDownloadableFileURL = (bucketId, fileId) => {
    return storage.getFileDownload(bucketId, fileId);
  };

  return (
    <>
      <ul className="w-fit border-2">
        {songs.map((song) => (
          <li
            key={song.$id}
            className="flex items-center justify-between gap-14 border-b-2 p-5 "
          >
            <img
              src={getDownloadableFileURL(imageBucketId, song["image-id"])}
              alt={song.title}
              className="w-20"
            />
            <div>
              <h3 className="text-black dark:text-white text-lg pb-5 font-main font-semibold">
                {song.title}
              </h3>

              <audio controls>
                <source
                  src={getDownloadableFileURL(
                    audioBucketId,
                    song["audiofile-id"]
                  )}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </div>
            <button
              onClick={() => deleteSong(song.$id)}
              className="btn btn-secondary "
            >
              Verwijder
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SongList;
