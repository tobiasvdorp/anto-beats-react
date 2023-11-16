const AboutMeCard = ({ title, paragraph, position }) => {
  const positionClass = position === "left" ? "self-start" : "self-end";

  return (
    <div
      className={`animate__animated animate__fadeInLeft bg-primary_dark text-black p-2 rounded-md ${positionClass}`}
    >
      <h3 className="font-vtc">{title}</h3>
      <p>{paragraph}</p>
    </div>
  );
};

export default AboutMeCard;
