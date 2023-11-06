import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { useUser } from "@/lib/appwrite/user";

// import { loginUser } from "@/lib/appwrite/api";
import { ILoginCredentials } from "@/types";

const SigninForm = () => {
  const user = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const session = await user.register(email, password);

      alert("Logged in!");
    } catch (err) {
      if (err.message.includes("invalid credentials")) {
        setError("Invalid credentials");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <form className="h-full flex flex-col gap-4 items-center justify-center px-5 w-96 max-w-full ">
        <h1 className="dark:text-white text-black text-4xl font-bold font-main">
          Sign in <br />
        </h1>

        <label
          htmlFor="email"
          className="w-full text-black dark:text-white font-second"
        >
          E-mail adress <br />
          <input
            type="email"
            id="email"
            required
            className="inputform"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label
          htmlFor="password"
          className="w-full text-black dark:text-white font-second"
        >
          Password <br />
          <input
            type="password"
            id="password"
            required
            className="inputform"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>

        {error && <p className="text-red-600 -mt-3">{error}</p>}

        <p className="dark:text-white text-black">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="underline dark:text-blue-500 text-blue-700"
          >
            Sign up
          </Link>
        </p>

        <button
          type="button"
          className="btn-secondary btn w-full text-lg"
          onClick={handleLogin}
        >
          Sign in
        </button>
      </form>
    </>
  );
};

export default SigninForm;
