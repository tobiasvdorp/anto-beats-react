import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { createUserAccount } from "@/lib/appwrite/api";

const SignupForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordError, setpasswordError] = useState("");
  const [nameError, setnameError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setpasswordError("");
    setnameError("");

    if (values.password.length < 8) {
      setpasswordError("Password must be at least 8 characters long");
      return;
    }

    if (values.name.length < 5) {
      setnameError("Name must be at least 5 characters long");
      return;
    }

    try {
      // Zorg ervoor dat je alleen de velden doorgeeft die INewUser verwacht
      const { ...newUserValues } = values;
      const newUser = await createUserAccount(newUserValues);
    } catch (error) {
      console.error(
        "Er is een fout opgetreden bij het aanmaken van de gebruiker",
        error
      );
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
