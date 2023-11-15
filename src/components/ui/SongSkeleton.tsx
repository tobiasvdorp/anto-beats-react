import { AiFillHeart } from "react-icons/ai";

const SongSkeleton = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex bg-gray-400 items-center dark:bg-background_dark bg-gradient-to-l dark:from-background_dark dark:to-background_dark dark:via-background_dark_third w-full">
        <button className="flex flex-row items-center my-1 text-white justify-between w-full px-4 py-3 hover:ring-2 ring-0 ring-transparent hover:ring-primary hover:bg-primary/30 duration-300 rounded-lg hover:-translate-y-1 hover:translate-x-1 hover:origin-top hover:font-semibold shadow-primary">
          {/* Placeholder afbeelding */}

          <div
            role="status"
            className="flex items-center justify-center h-full max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
          >
            <svg
              className="w-16 h-16 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            ></svg>
          </div>

          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-56 animate-pulse"></div>

          <div className="flex flex-col items-center justify-center">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-4 animate-pulse"></div>

            <div className="flex items-center justify-center gap-1">
              <AiFillHeart className="text-accent_dark" />
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4 animate-pulse"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SongSkeleton;
