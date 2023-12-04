import { ParallaxLayer } from "@react-spring/parallax";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useRef, useEffect, useState } from "react";
import "@splidejs/react-splide/css/sea-green";
import { fetchGalleryImages } from "@/lib/appwrite/api";
import { useUser } from "@/lib/appwrite/user";
import AddImage from "./modals/AddImage";
import { deleteGalleryImage } from "@/lib/appwrite/api";
import { useAlert } from "./ui/AlertProvider";
import { MdDeleteOutline } from "react-icons/md";
const Gallery = () => {
  const svgPath =
    "M -4.7 74.885 L -2.509 76.528 C -0.353 78.294 4.136 81.393 8.377 69.927 C 12.69 58.46 17.214 31.807 21.455 26.941 C 25.768 21.889 29.938 38.625 34.534 53.408 C 38.81 68.377 43.017 81.393 47.611 86.445 C 51.854 91.311 56.095 88.212 60.69 79.844 C 64.895 71.476 69.172 58.46 73.768 60.009 C 77.939 61.559 82.251 78.294 86.492 84.802 C 91.016 91.311 95.328 88.212 99.57 84.802 C 104.059 81.393 108.406 78.294 112.649 66.61 C 117.102 55.05 121.485 35.215 125.726 38.531 C 130.144 41.724 134.563 68.377 138.803 73.243 C 143.222 78.294 147.64 61.559 151.882 48.449 C 156.265 35.215 160.719 25.298 164.96 20.34 C 169.308 15.381 173.796 15.381 178.038 21.982 C 182.351 28.708 186.875 41.724 191.116 46.776 C 195.427 51.641 199.598 48.542 204.194 41.816 C 208.471 35.215 212.677 25.298 217.272 30.257 C 221.513 35.215 225.755 55.05 230.35 68.284 C 234.556 81.393 238.832 88.212 243.428 91.404 C 247.599 94.72 251.912 94.72 256.152 94.72 C 260.677 94.72 264.989 94.72 269.23 89.761 C 273.719 84.802 278.066 74.885 282.309 73.243 C 286.763 71.476 291.145 78.294 295.386 83.16 C 299.804 88.212 304.222 91.311 308.464 78.201 C 312.882 64.967 317.301 35.215 321.543 33.573 C 325.925 31.807 330.38 58.46 334.621 60.009 C 338.968 61.559 343.457 38.625 347.698 31.899 C 352.01 25.298 356.534 35.215 360.776 40.174 C 365.089 45.133 369.259 45.133 373.854 40.174 C 378.131 35.215 382.337 25.298 386.932 30.257 C 391.174 35.215 395.416 55.05 400.01 53.408 C 404.216 51.641 408.492 28.708 413.089 26.941 C 417.259 25.298 421.571 45.133 425.812 53.408 C 430.336 61.559 434.65 58.46 438.89 53.408 C 443.38 48.542 447.727 41.724 451.969 45.133 C 456.422 48.542 460.806 61.559 465.047 68.284 C 469.465 74.885 473.883 74.885 478.124 74.885 C 482.542 74.885 486.96 74.885 491.203 74.885 C 495.586 74.885 500.039 74.885 502.16 74.885 L 504.28 74.885 L 504.28 104.638 L 502.09 104.638 C 499.933 104.638 495.444 104.638 491.203 104.638 C 486.889 104.638 482.365 104.638 478.124 104.638 C 473.813 104.638 469.642 104.638 465.047 104.638 C 460.769 104.638 456.563 104.638 451.969 104.638 C 447.727 104.638 443.486 104.638 438.89 104.638 C 434.684 104.638 430.408 104.638 425.812 104.638 C 421.642 104.638 417.329 104.638 413.089 104.638 C 408.564 104.638 404.252 104.638 400.01 104.638 C 395.522 104.638 391.174 104.638 386.932 104.638 C 382.477 104.638 378.096 104.638 373.854 104.638 C 369.436 104.638 365.018 104.638 360.776 104.638 C 356.358 104.638 351.939 104.638 347.698 104.638 C 343.315 104.638 338.861 104.638 334.621 104.638 C 330.273 104.638 325.784 104.638 321.543 104.638 C 317.229 104.638 312.706 104.638 308.464 104.638 C 304.152 104.638 299.981 104.638 295.386 104.638 C 291.109 104.638 286.903 104.638 282.309 104.638 C 278.066 104.638 273.826 104.638 269.23 104.638 C 265.024 104.638 260.748 104.638 256.152 104.638 C 251.982 104.638 247.669 104.638 243.428 104.638 C 238.904 104.638 234.592 104.638 230.35 104.638 C 225.861 104.638 221.513 104.638 217.272 104.638 C 212.818 104.638 208.434 104.638 204.194 104.638 C 199.776 104.638 195.358 104.638 191.116 104.638 C 186.698 104.638 182.28 104.638 178.038 104.638 C 173.654 104.638 169.202 104.638 164.96 104.638 C 160.613 104.638 156.123 104.638 151.882 104.638 C 147.57 104.638 143.045 104.638 138.803 104.638 C 134.492 104.638 130.322 104.638 125.726 104.638 C 121.449 104.638 117.243 104.638 112.649 104.638 C 108.406 104.638 104.164 104.638 99.57 104.638 C 95.365 104.638 91.087 104.638 86.492 104.638 C 82.321 104.638 78.008 104.638 73.768 104.638 C 69.243 104.638 64.932 104.638 60.69 104.638 C 56.2 104.638 51.854 104.638 47.611 104.638 C 43.158 104.638 38.774 104.638 34.534 104.638 C 30.115 104.638 25.697 104.638 21.455 104.638 C 17.037 104.638 12.619 104.638 8.377 104.638 C 3.995 104.638 -0.458 104.638 -2.58 104.638 L -4.7 104.638 L -4.7 74.885 Z";
  const mainSliderRef = useRef();
  const thumbnailSliderRef = useRef();
  const [images, setImages] = useState([]);
  const { isAdmin } = useUser();
  const [open, setOpen] = useState(false);
  const { showAlert } = useAlert();
  const [loadingStatus, setLoadingStatus] = useState({});

  // Set loading for image
  const setLoadingForImage = (imageId, isLoading) => {
    setLoadingStatus((prevStatus) => ({
      ...prevStatus,
      [imageId]: isLoading,
    }));
  };

  // Sync main and thumbnail slider
  useEffect(() => {
    if (mainSliderRef.current && thumbnailSliderRef.current) {
      mainSliderRef.current.sync(thumbnailSliderRef.current.splide);
    }
  }, []);

  // Load images from Appwrite
  useEffect(() => {
    const loadImages = async () => {
      const galleryImages = await fetchGalleryImages();
      setImages(galleryImages);
    };

    loadImages();
  }, []);

  // Main slider options
  const mainSliderOptions = {
    type: "loop",
    perPage: 3,
    focus: "center",
    height: "16rem",
    autoWidth: true,
    width: "100%",
    // If there are no images, disable autoplay
    autoplay: images.length === 0 ? false : true,
    lazyLoad: "nearby",
    pagination: true,
  };

  // Thumbnail slider options
  const thumbnailSliderOptions = {
    type: "slide",
    focus: "center",
    arrows: false,
    perPage: 5,
    fixedWidth: 90,
    height: 60,
    autoWidth: true,
    gap: 10,
    rewind: true,
    pagination: false,
    isNavigation: true,
    breakpoints: {
      600: {
        fixedWidth: 60,
        fixedHeight: 44,
      },
    },
  };
  const handleDelete = async (fileId) => {
    setLoadingForImage(fileId, true); // Start loading voor specifieke foto
    try {
      await deleteGalleryImage(fileId);
      showAlert("Image deleted", "success");
      updateGallery();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForImage(fileId, false); // Stop loading na verwijdering
    }
  };

  // Update gallery
  const updateGallery = () => {
    fetchGalleryImages().then((newImages) => {
      setImages(newImages);
    });
  };
  return (
    <>
      {" "}
      {/* Background */}
      <ParallaxLayer offset={2.95} speed={2}>
        <svg viewBox="0.795 0 500 100" xmlns="http://www.w3.org/2000/svg">
          <path
            className="bg-new_green stroke-white"
            fillOpacity="1"
            d={svgPath}
            strokeWidth="0.8"
          />
        </svg>
        <div className="h-[500vh] bg-new_green 0 z-0"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={3} speed={0.3} factor={2} className="z-1">
        <div className="w-full max-w-2xl flex flex-col items-center justify-center mx-auto">
          <h2 className="text-5xl font-vtc text-white  text-shadow text-center ">
            Image Gallery
          </h2>
          <p className="text-white text-center font-main font-semibold">
            Pictures we have taken over the years.
          </p>
          <AddImage updateGallery={updateGallery} />
          <Splide
            options={mainSliderOptions}
            ref={mainSliderRef}
            aria-label="My Favorite Images"
            className="main-slider"
          >
            {/* If there are no images, show placeholder */}
            {images.length === 0 &&
              // Map 3 times to show 3 placeholders
              Array.from(Array(3).keys()).map((_, index) => (
                <SplideSlide key={index} className="relative w-full h-full">
                  <img
                    src="/placeholder.png"
                    alt={`Placeholder ${index}`}
                    className="h-full w-full object-cover opacity-20 "
                  />
                  <span className="loading loading-spinner loading-lg absolute top-[45%] left-[48%] "></span>
                </SplideSlide>
              ))}
            {images.map((image, index) => (
              <SplideSlide key={index}>
                <img
                  src={image.imageurl}
                  alt={`Image ${index}`}
                  className=" h-full w-full object-cover"
                  loading="lazy"
                />
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(image.$id)}
                    className="absolute top-0 right-0 bg-red-500 text-white px-1 py-1 rounded-md hover:bg-red-600"
                  >
                    {loadingStatus[image.$id] ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <MdDeleteOutline className="text-xl" />
                    )}
                  </button>
                )}
              </SplideSlide>
            ))}
          </Splide>
          <Splide
            options={thumbnailSliderOptions}
            ref={thumbnailSliderRef}
            aria-label="Thumbnail Navigation"
            className="thumbnail-slider"
          >
            {/* If there are no images, show placeholder */}
            {images.length === 0 &&
              // Map 3 times to show 3 placeholders
              Array.from(Array(3).keys()).map((_, index) => (
                <SplideSlide key={index} className="relative ">
                  <img
                    src="/placeholder.png"
                    alt={`Placeholder ${index}`}
                    className="h-full w-full opacity-20 animate-pulse "
                  />
                </SplideSlide>
              ))}
            {images.map((image, index) => (
              <SplideSlide key={index}>
                <img
                  src={image.imageurl}
                  alt={`Image ${index}`}
                  className="w-full h-full"
                  loading="lazy"
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </ParallaxLayer>
    </>
  );
};

export default Gallery;
