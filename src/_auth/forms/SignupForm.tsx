import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { createUserAccount } from "@/lib/appwrite/api";
import { AppwriteException } from "appwrite";

const SignupForm = () => {
  // State for storing form values
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordError, setpasswordError] = useState("");
  const [nameError, setnameError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Reset error messages
    setpasswordError("");
    setnameError("");

    // Validate form inputs...

    try {
      const newUser = await createUserAccount(values);
      // Handle success (e.g., redirect to dashboard)
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again later."; // Default error message

      if (error instanceof AppwriteException) {
        // Check for specific error messages
        if (
          error.message.includes(
            "user with the same id, email, or phone already exists"
          )
        ) {
          errorMessage = "You already have an account.";
        } else if (error.message.includes("Rate limit")) {
          errorMessage = "Server is too busy... Try again later.";
        }
        // Set the error message based on the specific error
        setpasswordError(errorMessage);
      } else {
        // If the error is not an instance of AppwriteException, use the default error message
        setpasswordError(errorMessage);
      }
    }
  }

  return (
    <>
      <form
        className="h-screen flex flex-col gap-4 items-center justify-center p-5 w-96 pb-8"
        onSubmit={handleSubmit}
      >
        <h1 className="dark:text-white text-black text-4xl font-semibold mb-8">
          Sign up
        </h1>

        <label htmlFor="name" className="w-full text-black dark:text-white">
          Name* <br />
          <input
            type="name"
            id="name"
            required
            className="w-[100%] mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary inputform"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </label>
        {nameError && <p className="text-red-600 -mt-3">{nameError}</p>}
        <label htmlFor="email" className="w-full text-black dark:text-white">
          E-mail adress* <br />
          <input
            type="email"
            id="email"
            required
            className="w-[100%] mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary inputform"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </label>
        <label htmlFor="password" className="w-full text-black dark:text-white">
          Password* <br />
          <input
            type="password"
            id="password"
            required
            className="w-full mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary inputform"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </label>
        {passwordError && <p className="text-red-600 -mt-3">{passwordError}</p>}

        <p className="dark:text-white text-black">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="underline dark:text-blue-500 text-blue-700 "
          >
            Sign in
          </Link>
        </p>
        <button type="submit" className="btn-secondary btn w-full">
          Sign up
        </button>
      </form>
    </>
  );
};

export default SignupForm;
