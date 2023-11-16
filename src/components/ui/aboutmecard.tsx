import Atropos from "atropos/react";
import "atropos/atropos.css";

const AboutMeCard = ({ title, paragraph, position }) => {
  const positionClass =
    position === "left"
      ? "self-start animate__backInRight"
      : "self-end animate__backInLeft";

  return (
    <Atropos
      className={`${positionClass}  bg-transparent`}
      shadow={false}
      highlight={false}
    >
      <div
        className={`border-background_dark border-4 m-5 bg-primary_dark p-4 text-black animate__animated max-w-2xl rounded-xl depth-transform 
    ${position === "left" ? "depth-transform" : "depth-transform-2"}
    `}
        data-atropos-offset="0"
      >
        <h3
          className="font-vtc tracking-widest capitalize text-lg drop-shadow-2xl"
          data-atropos-offset="2"
        >
          {title}
        </h3>
        <p data-atropos-offset="0">{paragraph}</p>
      </div>
    </Atropos>
  );
};

export default AboutMeCard;
