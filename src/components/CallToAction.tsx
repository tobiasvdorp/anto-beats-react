function CallToAction() {
  return (
    <>
      <div className="cta-container flex justify-center h-screen bg-[#000B76]">
        {/* Row container */}
        <div className="w-full max-w-5xl my-auto overflow-auto flex flex-row items-center justify-between flex-nowrap flex-shrink">
          <div>
            {/* Text */}
            <h1 className="font-semibold text-4xl text-black dark:text-white mb-8">
              Pr<span className="text-secondary">o</span>d. by <br></br>{" "}
              <span className="font-extrabold text-9xl">ANTO</span>
            </h1>

            {/* Buttons */}
            <div className="flex flex-row gap-2">
              <a href="#" className="btn-secondary btn">
                Listen
              </a>
              <a href="#" className="btn-secondary btn">
                Contact
              </a>
            </div>
          </div>
          <img
            src="/astronaut.png"
            alt="astronaut"
            className="hidden md:block"
          />
        </div>
      </div>
    </>
  );
}

export default CallToAction;
