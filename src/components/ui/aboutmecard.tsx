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
  const [cardTitle, setCardTitle] = useState(title); // Nu is het een string
  const [cardParagraph, setCardParagraph] = useState(paragraph);
  const [error, setError] = useState(""); // Error state voor het formulier

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedCard = await updateAboutMeCard(cardId, cardTitle, value);

      // Bijwerken van de lokale state na een succesvolle update
      setCardParagraph(updatedCard.paragraph); // of value
      setCardTitle(updatedCard.title); // of cardTitle
      setFormActive(false); // Sluit het formulier alleen als de update succesvol is
      setError(""); // Wis foutmeldingen
    } catch (error) {
      console.error("Failed to update card:", error);
      setError("Error updating card. Please try again later.");
      // Hier niet sluiten van het formulier en niet bijwerken van de lokale state
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
        className={`relative border-background_dark border-4 m-7 bg-primary_dark p-4 text-black animate__animated max-w-2xl rounded-xl depth-transform 
    ${position === "left" ? "depth-transform" : "depth-transform-2"}
    `}
        data-atropos-offset="0"
      >
        {/* Title that can be changed */}
        <h2
          data-atropos-offset="1"
          className={`font-main font-vtc tracking-widest capitalize text-2xl absolute -top-5 left-5   bg-primary_dark p-2 rounded-xl ${
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
