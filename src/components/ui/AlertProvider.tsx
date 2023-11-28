import { createContext, useState, useContext } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoCloseSharp, IoWarningOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [animation, setAnimation] = useState("");

  const showAlert = (message, type) => {
    if (alert.message) {
      setAlert({ message: "", type: "" });
      setAnimation("animate__bounceInUp");
      setTimeout(() => {
        setAlert({ message, type });
      }, 1);
    } else {
      setAnimation("animate__bounceInUp");
      setAlert({ message, type });
    }
  };

  const hideAlert = () => {
    setAnimation("animate__bounceOutDown");

    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 500);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}

      {alert.message && (
        <div className="w-screen flex justify-center items-center">
          <div
            role="alert"
            className={`alert alert-${alert.type} ${
              alert.type === "warning" && "bg-yellow-500 text-black"
            } 

            fixed bottom-2 mx-2 w-fit flex-nowrap flex justify-center  max-w-xl py-2 sm:py-3 sm:px-3 px-2  gap-3 animate__animated ${animation} `}
          >
            {alert.type === "success" && (
              <FaRegCircleCheck className="text-xl w-8" />
            )}

            {alert.type === "warning" && (
              <IoWarningOutline className="text-xl w-8" />
            )}

            {alert.type === "error" && (
              <MdErrorOutline className="text-xl w-8" />
            )}

            <span>{alert.message}</span>
            <button
              onClick={hideAlert}
              className="btn-close pl-3"
              aria-label="Close"
            >
              <IoCloseSharp className="text-2xl hover:bg-primary_dark rounded-md hover:text-white duration-300" />
            </button>
          </div>
        </div>
      )}

      {/* Error */}
    </AlertContext.Provider>
  );
};
