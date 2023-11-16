import { useContext } from "react";
import { ContentContext } from "@/lib/appwrite/ContentContext";
import AboutMeCard from "./ui/aboutmecard";

const AboutMe = () => {
  const content = useContext(ContentContext);

  const aboutMeContent = content["about_me"];

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 md:p-4">
      <h2 className="text-5xl font-vtc">Who is Anto?</h2>
      {/* Card */}
      <AboutMeCard
        title={aboutMeContent?.title}
        paragraph={aboutMeContent?.paragraph}
        position="left"
      />
      <AboutMeCard
        title={aboutMeContent?.title}
        paragraph={aboutMeContent?.paragraph}
        position="right"
      />
    </div>
  );
};

export default AboutMe;
