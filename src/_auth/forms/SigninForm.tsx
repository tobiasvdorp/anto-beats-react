import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";

import { loginUser } from "@/lib/appwrite/api";
import { ILoginCredentials } from "@/types"; // Zorg ervoor dat dit pad klopt

const SigninForm = () => {
  // State voor het opslaan van inloggegevens
  const [credentials, setCredentials] = useState<ILoginCredentials>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const session = await loginUser(credentials);
      console.log(session);
    } catch (error) {
      setError("Failed to log in. Try again later.");
    }
  }

  return (
    <>
      <form
        className="h-full flex flex-col gap-4 items-center justify-center px-5 w-96 max-w-full "
        onSubmit={handleSubmit}
      >
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
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
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
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
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

        <button type="submit" className="btn-secondary btn w-full">
          Inloggen
        </button>
      </form>
    </>
  );
};

export default SigninForm;
