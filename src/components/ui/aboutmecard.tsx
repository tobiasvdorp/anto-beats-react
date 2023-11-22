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

  return (
    <Atropos
      className={`${positionClass}  bg-transparent`}
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
        <p data-atropos-offset="2" className="font-main">
          {paragraph}
          {isAdmin && (
            <button className="pl-2">
              <FaEdit className="hover:text-accent duration-200" />
            </button>
          )}
        </p>
      </div>
    </Atropos>
  );
};

export default AboutMeCard;
