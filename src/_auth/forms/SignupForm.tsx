import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "@/lib/appwrite/user";
// import { useState, FormEvent } from "react";
// import { createUserAccount } from "@/lib/appwrite/api";
// import { AppwriteException } from "appwrite";
// import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  // const navigate = useNavigate();

  // // State for storing form values
  // const [values, setValues] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const [passwordError, setpasswordError] = useState("");
  // const [nameError, setnameError] = useState("");

  // async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   // Reset error messages
  //   setpasswordError("");
  //   setnameError("");

  //   // Validate form inputs
  //   if (values.password.length < 8) {
  //     setpasswordError("Password must be at least 8 characters long");
  //     return;
  //   }
  //   if (values.name.length < 5) {
  //     setnameError("Name must be at least 5 characters long");
  //     return;
  //   }

  //   try {
  //     const newUser = await createUserAccount(values);
  //     navigate("/account-created");
  //   } catch (error) {
  //     let errorMessage = "Something went wrong. Please try again later."; // Default error message

  //     if (error instanceof AppwriteException) {
  //       // Check for specific error messages
  //       if (
  //         error.message.includes(
  //           "user with the same id, email, or phone already exists"
  //         )
  //       ) {
  //         errorMessage = "You already have an account.";
  //       } else if (error.message.includes("Rate limit")) {
  //         errorMessage = "Server is too busy... Try again later.";
  //       }
  //       // Set the error message based on the specific error
  //       setpasswordError(errorMessage);
  //     } else {
  //       // If the error is not an instance of AppwriteException, use the default error message
  //       setpasswordError(errorMessage);
  //     }
  //   }
  // }
  const user = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <>
      <form className="h-full flex flex-col gap-4 items-center justify-center px-5 w-96 max-w-full ">
        <h1 className="dark:text-white text-black text-4xl font-bold text-center font-main">
          Sign up <br />
        </h1>
        <label
          htmlFor="name"
          className="w-full text-black dark:text-white font-second"
        >
          Name <br />
          <input
            type="name"
            id="name"
            value={name}
            required
            className="inputform"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>
        {/* {nameError && <p className="text-red-600 -mt-3">{nameError}</p>} */}
        <label
          htmlFor="email"
          className="w-full text-black dark:text-white font-second"
        >
          E-mail adress <br />
          <input
            type="email"
            id="email"
            value={email}
            required
            className="inputform"
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
            value={password}
            className="inputform"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        {/* {passwordError && <p className="text-red-600 -mt-3">{passwordError}</p>} */}

        <p className="dark:text-white text-black">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="underline dark:text-blue-500 text-blue-700 "
          >
            Sign in
          </Link>
        </p>
        <button
          type="button"
          onClick={() => user.register(name, email, password)}
          className="btn-secondary btn w-full font-bold text-lg"
        >
          Sign up
        </button>
      </form>
    </>
  );
};

export default SignupForm;
