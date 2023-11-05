import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className=" flex justify-center items-center w-full h-full">
            {/* Login */}
            <section className="flex flex-col items-center justify-center mt-auto mb-auto overflow-auto md:w-1/2 w-full pt-16">
              <Outlet />
            </section>
            {/* Image */}
            <img
              src="/public/login-bg.jpg"
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
