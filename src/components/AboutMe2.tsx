import { useContext, useEffect, useState } from "react";
import { ContentContext } from "@/lib/appwrite/ContentContext";
import { ParallaxLayer } from "@react-spring/parallax";
import { useUser } from "@/lib/appwrite/user";
import { getAboutMeImage, updateAboutMeCard } from "@/lib/appwrite/api";
import { FaEdit } from "react-icons/fa";
import Atropos from "atropos/react";
import "atropos/atropos.css";

const AboutMe2 = () => {
  const content = useContext(ContentContext);
  const { isAdmin } = useUser();
  const [formActive, setFormActive] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState("");

  const aboutMeSection = content?.about_me || {};
  useEffect(() => {
    setValue(aboutMeSection.paragraph);
    setTitle(aboutMeSection.title);
    getAboutMeImage().then((image) => setImage(image));
  }, [aboutMeSection]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === aboutMeSection.title && value === aboutMeSection.paragraph) {
      setFormActive(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const updatedSection = await updateAboutMeCard(
        aboutMeSection.$id,
        title,
        value
      );

      setValue(updatedSection.paragraph || value);
      setTitle(updatedSection.title || title);
      setFormActive(false);
      setError("");
    } catch (error) {
      console.error("Failed to update section:", error);
      setError("Error updating section. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ParallaxLayer offset={1} speed={2}>
        <svg
          viewBox="0.795 0 684.437 130.46"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#15053D"
            fillOpacity="1"
            d="M -2.758 94.62 L 0.231 89.461 C 3.173 84.495 9.296 73.887 15.081 66.317 C 20.964 58.459 27.135 53.637 32.922 61.207 C 38.805 69.067 44.493 89.317 50.762 102.334 C 56.595 115.353 62.334 120.175 68.601 102.334 C 74.388 84.495 80.173 43.029 86.44 45.777 C 92.178 48.334 98.012 94.62 104.281 110.05 C 109.971 125.478 115.853 110.05 121.638 97.175 C 127.81 84.495 133.692 73.887 139.478 76.635 C 145.601 79.192 151.532 94.62 157.319 89.461 C 163.393 84.495 169.371 58.459 175.158 45.777 C 181.184 32.904 187.212 32.904 192.997 40.618 C 199.025 48.334 205.051 63.762 210.836 66.317 C 216.816 69.067 222.891 58.459 228.677 48.334 C 234.608 38.209 240.732 27.601 246.517 32.904 C 252.399 38.209 258.571 58.459 264.356 76.635 C 270.238 94.62 275.928 110.05 282.197 104.891 C 288.031 99.925 293.767 73.887 300.036 61.207 C 305.822 48.334 311.608 48.334 317.876 45.777 C 323.614 43.029 329.448 38.209 335.715 32.904 C 341.405 27.601 347.287 22.779 353.074 22.635 C 359.246 22.779 365.128 27.601 370.913 45.777 C 377.036 63.762 382.967 94.62 388.752 99.779 C 394.829 104.745 400.807 84.495 406.593 81.747 C 412.62 79.192 418.646 94.62 424.433 92.065 C 430.459 89.317 436.487 69.067 442.272 56.048 C 448.251 43.029 454.326 38.209 460.111 43.173 C 466.042 48.334 472.165 63.762 477.952 76.635 C 483.835 89.317 490.006 99.925 495.792 99.779 C 501.674 99.925 507.364 89.317 513.631 79.192 C 519.466 69.067 525.203 58.459 531.472 56.048 C 537.257 53.637 543.042 58.459 549.311 53.493 C 555.049 48.334 560.883 32.904 567.15 32.904 C 572.84 32.904 578.722 48.334 584.508 48.334 C 590.679 48.334 596.562 32.904 602.349 30.349 C 608.472 27.601 614.403 38.209 620.188 48.334 C 626.263 58.459 632.242 69.067 638.027 68.921 C 644.055 69.067 650.081 58.459 655.868 50.889 C 661.894 43.029 667.921 38.209 673.707 30.349 C 679.687 22.779 685.762 12.171 688.653 7.205 L 691.547 2.046 L 691.547 156.336 L 688.558 156.336 C 685.616 156.336 679.493 156.336 673.707 156.336 C 667.825 156.336 661.653 156.336 655.868 156.336 C 649.986 156.336 644.296 156.336 638.027 156.336 C 632.193 156.336 626.455 156.336 620.188 156.336 C 614.403 156.336 608.616 156.336 602.349 156.336 C 596.61 156.336 590.777 156.336 584.508 156.336 C 578.82 156.336 572.937 156.336 567.15 156.336 C 560.979 156.336 555.096 156.336 549.311 156.336 C 543.188 156.336 537.257 156.336 531.472 156.336 C 525.395 156.336 519.418 156.336 513.631 156.336 C 507.605 156.336 501.577 156.336 495.792 156.336 C 489.765 156.336 483.737 156.336 477.952 156.336 C 471.973 156.336 465.898 156.336 460.111 156.336 C 454.182 156.336 448.059 156.336 442.272 156.336 C 436.39 156.336 430.218 156.336 424.433 156.336 C 418.55 156.336 412.861 156.336 406.593 156.336 C 400.758 156.336 395.021 156.336 388.752 156.336 C 382.967 156.336 377.18 156.336 370.913 156.336 C 365.175 156.336 359.341 156.336 353.074 156.336 C 347.384 156.336 341.502 156.336 335.715 156.336 C 329.545 156.336 323.663 156.336 317.876 156.336 C 311.752 156.336 305.822 156.336 300.036 156.336 C 293.962 156.336 287.982 156.336 282.197 156.336 C 276.169 156.336 270.143 156.336 264.356 156.336 C 258.33 156.336 252.302 156.336 246.517 156.336 C 240.537 156.336 234.463 156.336 228.677 156.336 C 222.747 156.336 216.623 156.336 210.836 156.336 C 204.954 156.336 198.784 156.336 192.997 156.336 C 187.115 156.336 181.425 156.336 175.158 156.336 C 169.324 156.336 163.586 156.336 157.319 156.336 C 151.532 156.336 145.747 156.336 139.478 156.336 C 133.741 156.336 127.906 156.336 121.638 156.336 C 115.949 156.336 110.066 156.336 104.281 156.336 C 98.109 156.336 92.227 156.336 86.44 156.336 C 80.317 156.336 74.388 156.336 68.601 156.336 C 62.526 156.336 56.547 156.336 50.762 156.336 C 44.734 156.336 38.707 156.336 32.922 156.336 C 26.894 156.336 20.868 156.336 15.081 156.336 C 9.104 156.336 3.027 156.336 0.135 156.336 L -2.758 156.336 L -2.758 94.62 Z"
            className="bg-background_secondary_dark stroke-primary_dark"
            transform="matrix(1, 0, 0, 1, -5.684341886080802e-14, 0)"
          />
        </svg>

        <div className="h-[200vh] bg-secondary_dark z-0"></div>
      </ParallaxLayer>{" "}
      {/* Voeg de bewerkingsfunctionaliteit hieronder toe */}
      <ParallaxLayer offset={1.8} factor={0.8} speed={1} className="">
        <div className="flex flex-col w-full gap-3">
          <img src={image}></img>
          <h2 className="text-5xl font-vtc text-white text-shadow">
            Who is Anto?
          </h2>
          {isAdmin && (
            <button className="" onClick={() => setFormActive(!formActive)}>
              <FaEdit className="hover:text-accent duration-200" />
            </button>
          )}
          {formActive ? (
            <form className="w-full">
              <input
                defaultValue={title}
                className="font-main bg-primary_dark p-1 border-2 border-primary w-full rounded-md"
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                defaultValue={value}
                className="font-main bg-primary_dark p-1 border-2 border-primary w-full h-52 rounded-md mt-2"
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="flex items-center gap-1 mt-2">
                <button
                  className="btn-secondary btn px-2 min-h-0 h-10 first-btn"
                  onClick={() => setFormActive(false)}
                >
                  Annuleren
                </button>
                {loading ? (
                  <button
                    className="btn btn-secondary px-2 min-h-0 h-10"
                    disabled
                  >
                    <span className="loading loading-spinner loading-sm"></span>{" "}
                    Laden...
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary px-10 min-h-0 h-10 border-none"
                    onClick={handleSubmit}
                  >
                    Opslaan
                  </button>
                )}
                {error && (
                  <div className="text-black text-sm font-main font-semibold w-4/6">
                    {error}
                  </div>
                )}
              </div>
            </form>
          ) : (
            <>
              <p className="text-accent font-main font-semibold uppercase">
                {title}
              </p>
              <p className="text-white font-main opacity-70">{value}</p>
            </>
          )}
        </div>
      </ParallaxLayer>
    </>
  );
};

export default AboutMe2;
