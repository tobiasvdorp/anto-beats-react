import AudioPlayer from "@/components/AudioPlayer";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import CallToAction from "@/components/CallToAction";
import AboutMe from "@/components/AboutMe";
// import RandomDots from "@/components/RandomDots";
const Home = () => {
  const isHome = true;
  return (
    <div className="max-w-7xl flex">
      <Parallax pages={5} className="dark:bg-background_dark bg-background">
        {/* <ParallaxLayer className="z-100" offset={0} factor={5}>
          <RandomDots className="z-100" />
        </ParallaxLayer> */}
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
            backgroundRepeat: "repeat-x",
          }}
        />

        {/* Audioplayer */}
        <ParallaxLayer
          offset={0.9}
          speed={0.9}
          factor={0.8}
          className="flex items-center justify-center mt-60"
        >
          <AudioPlayer isHome={isHome} />
        </ParallaxLayer>

        {/* Waves */}
        <ParallaxLayer
          offset={1.2}
          speed={1.8}
          factor={2.5}
          style={{
            backgroundImage: `url(/waves2.svg)`,

            backgroundSize: "contain",
            backgroundRepeat: "repeat-x",
          }}
          className="flex items-center justify-center "
        ></ParallaxLayer>

        {/* About me */}
        <ParallaxLayer offset={1.6} factor={0.8} speed={1} className="mt-60">
          <AboutMe />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Home;
