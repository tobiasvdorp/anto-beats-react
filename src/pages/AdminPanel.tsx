import SongList from "@/components/SongList";
import AddSong from "@/components/modals/AddSong";
import { useState } from "react";

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

      <div>
        <button className="btn btn-secondary" onClick={openModal}>
          + Nieuw nummer
        </button>
        <SongList />
      </div>
    </div>
  );
};

export default AdminPanel;
