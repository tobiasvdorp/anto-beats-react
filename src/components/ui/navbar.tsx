import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div className="navbar bg-background dark:bg-background_dark fixed z-10">
        <div className="navbar-start">
          <div className="dropdown">
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
            </ul>
          </div>
          <a className="btn btn-ghost text-black dark:text-white opacity-90 normal-case text-3xl">
            Anto
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-black dark:text-white">
            <li>
              <Link to="/" className="hover:bg-primary hover:text-black">
                Home
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
