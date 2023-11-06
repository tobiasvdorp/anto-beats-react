import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { useUser } from "@/lib/appwrite/user";

// import { loginUser } from "@/lib/appwrite/api";

const SigninForm = () => {
  const user = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const session = await user.login(email, password);
    } catch (err) {
      if (
        // error message includes "Invalid credentials" or "at least 8 characters, say "Invalid credentials"
        err.message.includes("Invalid credentials") ||
        err.message.includes("at least 8 characters")
      ) {
        setError("Incorrect credentials.");
      } else if (err.message.includes("Rate limit")) {
        setError("Server is too busy... Try again later.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  function validateEmail(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

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
