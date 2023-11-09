import AudioPlayer from "@/components/AudioPlayer";
import AddSong from "@/components/modals/AddSong";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { checkIfUserIsAdmin } from "@/lib/appwrite/api"; // Zorg ervoor dat dit pad klopt

const AdminPanel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const isHome = false;
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchAdminStatus = async () => {
      setLoading(true);
      const adminStatus = await checkIfUserIsAdmin();
      setIsAdmin(adminStatus);
      setLoading(false);
    };

    fetchAdminStatus();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    ); // Of een andere loading indicator
  }

  if (!isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center">
        Access Denied
      </div>
    ); // Of een redirect, of een andere error weergave
  }

  return (
    <div className="flex justify-center h-screen w-screen pt-16 px-2">
      <div className="flex flex-col items-center justify-center mt-auto mb-auto overflow-auto gap-2 w-full">
        {modalOpen && <AddSong closeModal={closeModal} />}

        <h1 className="text-center dark:text-white text-black text-4xl font-bold font-main">
          Music Manager
        </h1>
        <button
          className="btn btn-secondary text-md py-0 min-h-0 h-10"
          onClick={openModal}
        >
          <AiOutlinePlus className="text-lg" /> Add song
        </button>

        <AudioPlayer isHome={isHome} />
      </div>
    </div>
  );
};

export default AdminPanel;
