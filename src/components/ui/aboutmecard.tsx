const AboutMeCard = ({ title, paragraph, position }) => {
  const positionClass = position === "left" ? "self-start" : "self-end";

  return (
    <div className={` ${positionClass}`}>
      <h3>{title}</h3>
      <p>{paragraph}</p>
    </div>
  );
};

export default AboutMeCard;
