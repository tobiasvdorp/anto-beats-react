import AudioPlayer from "@/components/AudioPlayer";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import CallToAction from "@/components/CallToAction";
const Home = () => {
  const isHome = true;
  return (
    <div className="max-w-7xl">
      <Parallax pages={5} className="dark:bg-background_dark bg-background">
        {/* Background */}
        <ParallaxLayer offset={0} speed={0.2} factor={5} />

        {/* Call to action */}
        <ParallaxLayer offset={0} speed={0.1} factor={0.8}>
          <CallToAction />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.7}
          speed={1}
          factor={0.5}
          style={{
            backgroundImage: `url(/background.svg)`,
            backgroundSize: "cover",
          }}
        ></ParallaxLayer>

        {/* About me  */}
        <ParallaxLayer
          offset={0.95}
          speed={1}
          className="flex items-center justify-center bg-red-200"
        >
          <AudioPlayer isHome={isHome} />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Home;
