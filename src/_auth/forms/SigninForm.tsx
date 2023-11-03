import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/lib/appwrite/api";
import { ILoginCredentials } from "@/types"; // Zorg ervoor dat dit pad klopt

const SigninForm = () => {
  const navigate = useNavigate();
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
      navigate("/dashboard");
    } catch (error) {
      console.error("Er is een fout opgetreden bij het inloggen", error);
      setError("Inloggen mislukt. Controleer uw e-mailadres en wachtwoord.");
    }
  }

  return (
    <>
      <form
        className="h-screen flex flex-col gap-4 items-center justify-center p-5 w-96 pb-8"
        onSubmit={handleSubmit}
      >
        <h1 className="dark:text-white text-black text-4xl font-semibold mb-8">
          Sign in
        </h1>

        <label htmlFor="email" className="w-full text-black dark:text-white">
          E-mailadres* <br />
          <input
            type="email"
            id="email"
            required
            className="w-full mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary inputform"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </label>
        <label htmlFor="password" className="w-full text-black dark:text-white">
          Wachtwoord* <br />
          <input
            type="password"
            id="password"
            required
            className="w-full mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary inputform"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </label>

        {error && <p className="text-red-600 -mt-3">{error}</p>}

        <p className="dark:text-white text-black">
          Heb je nog geen account?{" "}
          <Link
            to="/sign-up"
            className="underline dark:text-blue-500 text-blue-700"
          >
            Registreren
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
