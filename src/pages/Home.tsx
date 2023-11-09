import AudioPlayer from "@/components/AudioPlayer";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import CallToAction from "@/components/CallToAction";
const Home = () => {
  const isHome = true;
  return (
    <div className="max-w-7xl">
      <Parallax pages={5} className="dark:bg-background_dark bg-background">
        {/* Background */}
        <ParallaxLayer offset={0} speed={0} factor={5} />

        {/* Call to action */}
        <ParallaxLayer offset={0} speed={0.3} factor={0.8}>
          <CallToAction />
        </ParallaxLayer>

        {/* Waves */}
        <ParallaxLayer
          offset={0.8}
          speed={1}
          factor={1}
          style={{
            backgroundImage: `url(/waves.svg)`,
            backgroundSize: "contain",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Audioplayer */}
        <ParallaxLayer
          offset={0.99}
          speed={2}
          className="flex items-center justify-center mt-52"
        >
          <AudioPlayer isHome={isHome} />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Home;
