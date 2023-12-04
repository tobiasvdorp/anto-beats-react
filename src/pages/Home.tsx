import AudioPlayer from "@/components/AudioPlayer";
import { Parallax } from "@react-spring/parallax";
import CallToAction from "@/components/CallToAction";
import AboutMe from "@/components/AboutMe";
import { useUser } from "@/lib/appwrite/user";
import Gallery from "@/components/Gallery";
import AboutMe2 from "@/components/AboutMe2";

const Home = () => {
  const { isAdmin } = useUser();

  return (
    <div className="max-w-7xl flex">
      <Parallax pages={5} className="dark:bg-background_dark bg-background">
        <CallToAction />
        <AudioPlayer isAdmin={isAdmin} />
        {/* <AboutMe /> */}
        <AboutMe2 />
        <Gallery />
      </Parallax>
    </div>
  );
};

export default Home;
