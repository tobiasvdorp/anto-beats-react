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
        <ParallaxLayer offset={0} speed={0.3} factor={0.5}>
          <CallToAction />
        </ParallaxLayer>

        {/* Waves */}
        <ParallaxLayer
          offset={0.9}
          speed={1.4}
          factor={1.3}
          style={{
            backgroundImage: `url(/waves.svg)`,
            backgroundSize: "contain",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Audioplayer */}
        <ParallaxLayer
          offset={0.9}
          speed={1}
          factor={0.8}
          className="flex items-center justify-center mt-60"
        >
          <AudioPlayer isHome={isHome} />
        </ParallaxLayer>

        {/* Waves */}
        <ParallaxLayer
          offset={1.3}
          speed={1.7}
          factor={1.3}
          style={{
            backgroundImage: `url(/waves2.svg)`,
            backgroundSize: "contain",
            backgroundRepeat: "repeat",
          }}
          className="flex items-center justify-center "
        ></ParallaxLayer>
        {/* DIV */}
        <ParallaxLayer offset={1.2} factor={0.8} speed={1}></ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Home;
