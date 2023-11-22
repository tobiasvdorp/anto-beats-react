import Atropos from "atropos/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "atropos/atropos.css";
import { useUser } from "@/lib/appwrite/user";
import { updateAboutMeCard } from "@/lib/appwrite/api";

const AboutMeCard = ({ cardId, title, paragraph, position }) => {
  const positionClass =
    position === "left"
      ? "self-start animate__backInRight"
      : "self-end animate__backInLeft";

  const { isAdmin } = useUser();
  const [formActive, setFormActive] = useState(false);
  const [value, setValue] = useState(paragraph);
  const [loading, setLoading] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const [cardParagraph, setCardParagraph] = useState(paragraph);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (cardTitle === title && cardParagraph === paragraph) {
      setFormActive(false);
      setLoading(false);
      return;
    }
    try {
      const updatedCard = await updateAboutMeCard(cardId, cardTitle, value);

      setCardParagraph(updatedCard.paragraph);
      setCardTitle(updatedCard.title);
      setFormActive(false);
      setError("");
    } catch (error) {
      console.error("Failed to update card:", error);
      setError("Error updating card. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Atropos
      className={`${positionClass}  bg-transparent w-full`}
      shadow={false}
      highlight={false}
    >
      <div
        className={`flex flex-col gap-2 relative border-background_dark border-4 my-10 bg-primary_dark p-4 text-black animate__animated max-w-2xl rounded-xl depth-transform 
    ${position === "left" ? "depth-transform" : "depth-transform-2"}
    `}
        data-atropos-offset="0"
      >
        <div>
          {/* Title that can be changed */}
          <h2
            data-atropos-offset="1"
            className={`font-main font-vtc tracking-widest capitalize text-2xl absolute -top-8 left-5   bg-primary_dark p-2 rounded-xl ${
              formActive ? "hidden" : ""
            }`}
          >
            {cardTitle}
            {isAdmin && (
              <button className="pl-2" onClick={() => setFormActive(true)}>
                <FaEdit className="hover:text-accent duration-200" />
              </button>
            )}
          </h2>
          {/* Form for changing the title */}
          {formActive && (
            <form className="w-full">
              <input
                defaultValue={cardTitle}
                className="font-main bg-primary_dark p-1 border-2 border-primary w-full rounded-md"
                onChange={(e) => setCardTitle(e.target.value)}
              />
              <br />
            </form>
          )}
        </div>
        {/* Paragraph that can be changed */}
        <p
          data-atropos-offset="2"
          className={`font-main ${formActive ? "hidden" : ""}`}
        >
          {cardParagraph}
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
                className="btn-secondary btn px-2 min-h-0 h-10 first-btn"
                onClick={() => setFormActive(false)}
              >
                Cancel
              </button>
              {loading ? (
                <button
                  className="btn btn-secondary px-2 min-h-0 h-10"
                  disabled
                >
                  <span className="loading loading-spinner loading-sm"></span>{" "}
                  Loading...
                </button>
              ) : (
                <button
                  className="btn btn-secondary px-10 min-h-0 h-10 border-none"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              )}
              {/* Error message */}
              {error && (
                <div className="text-black text-sm font-main font-semibold w-4/6">
                  {error}
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </Atropos>
  );
};

export default AboutMeCard;
