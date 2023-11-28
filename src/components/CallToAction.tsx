import { ParallaxLayer } from "@react-spring/parallax";
import Atropos from "atropos/react";
import { useAlert } from "./ui/AlertProvider";
function CallToAction() {
  const { showAlert } = useAlert();
  return (
    <>
      <ParallaxLayer offset={0} speed={0.3} factor={1}>
        <div className="h-[200vh] bg-background_dark_secondary"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.3} factor={1}>
        <div className="cta-container flex justify-center h-screen bg-background_dark_secondary ">
          {/* Row container */}
          <div className="w-full max-w-5xl my-auto overflow-hidden flex flex-row items-center lg:justify-between lg:m-10 justify-center flex-nowrap flex-shrink">
            <div className=" lg:ml-0 mx-10 overflow-visible">
              {/* Text */}

              <h1
                className="font-semibold font-vtc text-3xl md:text-5xl text-black dark:text-white mb-8 animate__animated animate__fadeInUp"
                id="title"
              >
                <span id="title1">Prod. by </span>
                <br />
                <span className="font-extrabold text-8xl md:text-[10rem]">
                  ANTO
                </span>
              </h1>

              {/* Buttons */}
              <div className="flex flex-row gap-2 p-1">
                <Atropos className="">
                  <a
                    href="#"
                    className="btn-secondary btn md:px-8 px-6 md:text-lg min-h-0 md:h-12 h-10 first-btn"
                  >
                    Contact
                  </a>
                </Atropos>
                <Atropos>
                  <a className="btn-secondary btn md:px-10 px-8 md:text-lg min-h-0 md:h-12 h-10">
                    Listen
                  </a>
                </Atropos>
              </div>
            </div>

            <img
              src="/astronaut.png"
              alt="astronaut"
              className="hidden xs:block w-[40vw] sm:ml-10 md:max-w-[400px] max-w-[300px] "
            />
          </div>
        </div>
      </ParallaxLayer>
    </>
  );
}

export default CallToAction;
