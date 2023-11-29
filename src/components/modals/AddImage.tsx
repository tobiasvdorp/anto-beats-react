import { useState, useRef } from "react";
import { useAlert } from "@/components/ui/AlertProvider";
import { useUser } from "@/lib/appwrite/user";
import { CiImageOn } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { addGalleryImage } from "@/lib/appwrite/api";

export default function AddImage({
  updateGallery,
}: {
  updateGallery: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFileName, setImageFileName] = useState("");
  const imageInputRef = useRef(null);
  const { showAlert } = useAlert();
  const { isAdmin } = useUser();
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFileName(file.name);
      setImage(file);
    }
  };
  const uploadImage = async () => {
    if (image) {
      setLoading(true);
      try {
        await addGalleryImage(image);
        showAlert("Image successfully uploaded", "success");
        updateGallery();
        setImage(null);
        setImageFileName("");
        setOpen(false);
      } catch (error) {
        showAlert("Failed to upload image", "error");
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      showAlert("No image selected", "error");
    }
  };

  return (
    <>
      {" "}
      {isAdmin && (
        <div className="flex flex-col gap-2">
          {open && (
            <>
              {" "}
              <div className=" flex flex-col items-center justify-center gap-2">
                <label className="text-white font-main">
                  <br />
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                    className="hidden"
                    ref={imageInputRef}
                  />
                  <button
                    onClick={() =>
                      imageInputRef.current && imageInputRef.current.click()
                    }
                    className={`bg-secondary px-3 py-2  duration-200  ring-primary_dark  rounded-md flex items-center  gap-2 ${
                      image
                        ? "bg-green-500 text-black ring-0 hover:text-black"
                        : "text-white ring-2 hover:text-primary_dark"
                    }`}
                  >
                    <CiImageOn className="text-xl" />{" "}
                    {imageFileName || "Select image"}
                  </button>
                </label>
                <div className="flex gap-2">
                  {/* Exit button */}
                  <button
                    className="btn btn-secondary first-btn min-h-0 h-10 w-fit px-2 bg-red-500 hover:bg-red-600"
                    onClick={closeModal}
                  >
                    <IoCloseSharp className="text-lg" />
                  </button>
                  <button
                    className="btn btn-secondary min-h-0 h-10 w-fit px-3"
                    onClick={uploadImage}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-lg  "></span>
                    ) : (
                      <FaCheck />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
          {!open && (
            <button
              className="btn btn-secondary text-md py-0 px-3 min-h-0 h-10 w-fit flex items-center"
              onClick={openModal}
            >
              <AiOutlinePlus className="text-lg" /> Add image
            </button>
          )}
        </div>
      )}{" "}
    </>
  );
}
