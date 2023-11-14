import Atropos from "atropos/react";

function CallToAction() {
  return (
    <>
      <div className="cta-container flex justify-center h-screen bg-background_dark_secondary x-10">
        {/* Row container */}
        <div className="w-full max-w-5xl my-auto overflow-auto flex flex-row items-center lg:justify-between justify-center flex-nowrap flex-shrink">
          <div className="ml-10 lg:ml-0 overflow-visible">
            {/* Text */}
            <h1
              className="font-semibold text-4xl md:text-5xl text-black dark:text-white mb-8 animate__animated animate__fadeInUp"
              id="title"
            >
              <span id="title1">Prod. by </span>
              <br />
              <span className="font-extrabold text-9xl sm:text-[10rem]">
                ANTO
              </span>
            </h1>

            {/* Buttons */}
            <div className="flex flex-row gap-2 p-1">
              <Atropos className="">
                <a
                  href="#"
                  className="btn-secondary btn px-8 text-lg first-btn"
                >
                  Contact
                </a>
              </Atropos>
              <Atropos>
                <a href="#" className="btn-secondary btn px-10 text-lg">
                  Listen
                </a>
              </Atropos>
            </div>
          </div>

          <img
            src="/astronaut.png"
            alt="astronaut"
            className="hidden md:block w-[40vw] ml-10 max-w-[400px]  "
          />
        </div>
      </div>
    </>
  );
}

export default CallToAction;
