import { ParallaxLayer } from "@react-spring/parallax";
import Atropos from "atropos/react";
const Gallery = () => {
  return (
    <>
      <ParallaxLayer
        offset={2.8}
        factor={0.1}
        speed={1}
        className="ml-[30vw] mt-52"
      >
        <img src="/placeholder.png" className="w-40"></img>
      </ParallaxLayer>
      <ParallaxLayer
        offset={2.85}
        factor={0.1}
        speed={1.3}
        className="ml-[10vw]"
      >
        <img src="/placeholder.png"></img>
      </ParallaxLayer>
      <ParallaxLayer
        offset={2.9}
        factor={0.1}
        speed={1.6}
        className="ml-[60vw]"
      >
        <Atropos className="w-fit">
          <img src="/placeholder.png" className="w-64"></img>
        </Atropos>
      </ParallaxLayer>
      <ParallaxLayer
        offset={2.95}
        factor={0.1}
        speed={1.9}
        className="ml-[50vw] mt-[40vh]"
      >
        <img src="/placeholder.png" className="w-64"></img>
      </ParallaxLayer>
      <ParallaxLayer
        offset={2.99}
        factor={0.1}
        speed={2.2}
        className="ml-[20vw] mt-[80vh]"
      >
        <img src="/placeholder.png" className="w-64"></img>
      </ParallaxLayer>
      <ParallaxLayer
        offset={2.99}
        factor={0.1}
        speed={2.5}
        className="ml-[70vw] mt-[40vh]"
      >
        <img src="/placeholder.png" className="w-64"></img>
      </ParallaxLayer>
      <ParallaxLayer
        offset={2.99}
        factor={0.1}
        speed={2.8}
        className="ml-[15vw] mt-[60vh] "
      >
        <img src="/placeholder.png" className="w-64"></img>
      </ParallaxLayer>
      <ParallaxLayer
        offset={2.99}
        factor={0.1}
        speed={3.1}
        className="ml-[50vw] mt-[10vh]"
      >
        <img src="/placeholder.png" className="w-64"></img>
      </ParallaxLayer>
    </>
  );
};

export default Gallery;
