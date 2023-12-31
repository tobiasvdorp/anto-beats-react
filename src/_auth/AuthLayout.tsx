import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "@/lib/appwrite/user";

const AuthLayout = () => {
  const user = useUser();

  return (
    <>
      {user.current ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className=" flex justify-center items-center w-full md:h-full h-screen">
            {/* Login */}
            <section className="flex flex-col items-center justify-center mt-auto mb-auto overflow-auto md:w-1/2 w-full pt-16">
              <Outlet />
            </section>
            {/* Image */}
            <img
              src="/login-bg.jpg"
              alt="wallpaper"
              className="hidden md:block h-screen w-1/2 object-cover bg-no-repeat"
            ></img>
          </div>
        </>
      )}
    </>
  );
};

export default AuthLayout;
