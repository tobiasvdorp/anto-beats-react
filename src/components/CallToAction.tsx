import Atropos from "atropos/react";

function CallToAction() {
  return (
    <>
      <div className="cta-container flex justify-center h-screen bg-background_dark_secondary px-10">
        {/* Row container */}
        <div className="w-full max-w-5xl my-auto overflow-auto flex flex-row items-center lg:justify-between justify-center flex-nowrap flex-shrink">
          <div>
            {/* Text */}
            <h1
              className="font-semibold text-4xl text-black dark:text-white mb-8 animate__animated animate__fadeInUp"
              id="title"
            >
              Prod. by <br />
              <span className="font-extrabold text-9xl">ANTO</span>
            </h1>

            {/* Buttons */}
            <div className="flex flex-row gap-2 p-1">
              <Atropos className="">
                <a href="#" className="btn-secondary btn px-8 ">
                  Listen
                </a>
              </Atropos>
              <Atropos>
                <a href="#" className="btn-secondary btn px-10">
                  Contact
                </a>
              </Atropos>
            </div>
          </div>

          <img
            src="/astronaut.png"
            alt="astronaut"
            className="hidden lg:block"
          />
        </div>
      </div>
    </>
  );
}

export default CallToAction;
