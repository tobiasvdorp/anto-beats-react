import AudioPlayer from "@/components/AudioPlayer";
import AddSong from "@/components/modals/AddSong";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const AdminPanel = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

        <AudioPlayer />
      </div>
    </div>
  );
};

export default AdminPanel;
