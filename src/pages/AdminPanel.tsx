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
    <div className="flex flex-col justify-center items-center w-full h-screen gap-4 ">
      {modalOpen && <AddSong closeModal={closeModal} />}

      <h1 className="text-center dark:text-white text-black text-4xl font-bold font-main">
        Music Manager
      </h1>
      <button className="btn btn-secondary text-lg" onClick={openModal}>
        <AiOutlinePlus className="text-xl" /> Nieuw nummer
      </button>

      <AudioPlayer />
    </div>
  );
};

export default AdminPanel;
