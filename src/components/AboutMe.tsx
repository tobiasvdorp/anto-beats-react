import { useContext } from "react";
import { ContentContext } from "@/lib/appwrite/ContentContext";

const AboutMe = () => {
  const content = useContext(ContentContext);

  // Direct toegang tot de inhoud van "about_me" met de sleutel
  const aboutMeContent = content["about_me"];

  return (
    <div>
      <h1>{aboutMeContent?.title}</h1>
      <p>{aboutMeContent?.paragraph}</p>
    </div>
  );
};

export default AboutMe;
