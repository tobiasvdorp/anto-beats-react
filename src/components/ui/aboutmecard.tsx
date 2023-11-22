import Atropos from "atropos/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "atropos/atropos.css";
import { useUser } from "@/lib/appwrite/user";

const AboutMeCard = ({ title, paragraph, position }) => {
  const positionClass =
    position === "left"
      ? "self-start animate__backInRight"
      : "self-end animate__backInLeft";

  const { isAdmin } = useUser();
  const [formActive, setFormActive] = useState(false);
  const [value, setValue] = useState(paragraph);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Atropos
      className={`${positionClass}  bg-transparent w-full`}
      shadow={false}
      highlight={false}
    >
      <div
        className={`relative border-background_dark border-4 m-5 bg-primary_dark p-4 text-black animate__animated max-w-2xl rounded-xl depth-transform 
    ${position === "left" ? "depth-transform" : "depth-transform-2"}
    `}
        data-atropos-offset="0"
      >
        <h3
          className="font-vtc tracking-widest capitalize text-2xl absolute -top-5 left-5   bg-primary_dark p-2 rounded-xl "
          data-atropos-offset="2"
        >
          {title}
        </h3>
        {/* If form is active, hide text */}
        <p
          data-atropos-offset="2"
          className={`font-main ${formActive ? "hidden" : ""}`}
        >
          {paragraph}
          {isAdmin && (
            <button className="pl-2" onClick={() => setFormActive(true)}>
              <FaEdit className="hover:text-accent duration-200" />
            </button>
          )}
        </p>
        {formActive && (
          <form className="w-full">
            <textarea
              defaultValue={value}
              className="font-main bg-primary_dark p-1 border-2 border-primary w-full h-52 rounded-md"
              onChange={(e) => setValue(e.target.value)}
            />
            <br />
            <div className="flex items-center gap-1">
              <button
                className="btn-secondary btn"
                onClick={() => setFormActive(false)}
              >
                Cancel
              </button>
              {loading ? (
                <button className="btn btn-secondary" disabled>
                  <span className="loading loading-spinner loading-sm"></span>{" "}
                  Loading...
                </button>
              ) : (
                <button className="btn btn-secondary" onClick={handleSubmit}>
                  Save
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </Atropos>
  );
};

export default AboutMeCard;
