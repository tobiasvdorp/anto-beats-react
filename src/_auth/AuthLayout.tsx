import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className="flex">
            {/* Login */}
            <section className="flex flex-col justify-center items-center py-10 md:w-1/2 w-full">
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
