import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { createUserAccount } from "@/lib/appwrite/api";

const SignupForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // Zorg ervoor dat je alleen de velden doorgeeft die INewUser verwacht
      const { ...newUserValues } = values;
      const newUser = await createUserAccount(newUserValues);
      console.log(newUser);
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
