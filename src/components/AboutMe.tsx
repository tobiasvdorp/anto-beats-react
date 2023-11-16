import { useContext } from "react";
import { ContentContext } from "@/lib/appwrite/ContentContext";
import AboutMeCard from "./ui/aboutmecard";

const AboutMe = () => {
  const content = useContext(ContentContext);

  const aboutMeSections = content["about_me"] || [];
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-5xl">Who is Anto?</h2>
      {aboutMeSections.map((section, index) => (
        <AboutMeCard
          key={index}
          title={section.title}
          paragraph={section.paragraph}
          position={index % 2 === 0 ? "left" : "right"}
        />
      ))}
    </div>
  );
};

export default AboutMe;
