import { Link } from "react-router-dom";
import { useUser } from "@/lib/appwrite/user";
import Atropos from "atropos/react";

export default function Navbar() {
  const user = useUser();

  return (
    <>
      <div className="navbar bg-background dark:bg-background_dark fixed z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <Atropos>
              <label
                tabIndex={0}
                className="btn btn-ghost lg:hidden text-black dark:text-white "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
            </Atropos>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-64"
            >
              <li>
                <Link
                  to="/"
                  className="hover:bg-primary hover:text-black text-lg"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard"}
                  className="hover:bg-primary hover:text-black text-lg"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                {user.current ? (
                  <>
                    <button
                      type="button"
                      className="hover:bg-primary hover:text-black text-lg"
                      onClick={() => user.logout()}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/sign-in"
                    className="hover:bg-primary hover:text-black text-lg"
                  >
                    Sign in
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <Atropos>
            <Link
              to={"/"}
              id="anto"
              className="text-white btn btn-ghost hover:bg-primary hover:text-black normal-case text-3xl "
            >
              Anto
            </Link>
          </Atropos>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-black dark:text-white">
            <li>
              <Link to="/" className="hover:bg-primary hover:text-black">
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard"}
                className="hover:bg-primary hover:text-black"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {/* <ModeToggle /> */}
          <div className="lg:block hidden">
            {user.current ? (
              <>
                <Atropos>
                  <button
                    type="button"
                    className="btn btn-secondary ml-2 text-lg px-2 h-10 min-h-0"
                    onClick={() => user.logout()}
                  >
                    Log out
                  </button>
                </Atropos>
              </>
            ) : (
              <Atropos>
                <Link
                  to="/sign-in"
                  className="btn btn-secondary ml-2 text-lg px-2 min-h-0 h-10"
                >
                  Log in
                </Link>
              </Atropos>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
