import { useContext } from "react";
import { ContentContext } from "@/lib/appwrite/ContentContext";
import AboutMeCard from "./ui/aboutmecard";

const AboutMe = () => {
  const content = useContext(ContentContext);

  const aboutMeSections = content["about_me"] || [];
  return (
    <div className="flex flex-col md:flex-row justify-center px-2 md:px-10 duration-200">
      <h2 className="text-5xl font-vtc text-white lg:pr-10 pl-3 text-shadow">
        Who is Anto?
      </h2>

      <div className="gap-3 w-full flex flex-col items-center justify-center max-w-6xl lg:max-w-4xl -ml-3">
        {aboutMeSections.map((section, index) => (
          <AboutMeCard
            key={index}
            cardId={section.$id}
            title={section.title}
            paragraph={section.paragraph}
            position={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutMe;
