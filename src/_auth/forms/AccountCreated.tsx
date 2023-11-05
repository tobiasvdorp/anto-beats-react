import { Link } from "react-router-dom";

const AccountCreated = () => {
  return (
    <div className=" flex justify-center">
      <div className="flex flex-col items-center w-full justify-center mt-auto mb-auto overflow-auto p-2">
        <h1 className="dark:text-white text-black text-4xl font-bold font-main text-center mb-3">
          Account created succesfully!
        </h1>
        <p className="dark:text-gray-500 text-black text-center mb-5 text-lg">
          Verify your email, then sign in.
        </p>
        <Link to="/sign-in" className="btn-secondary btn w-40 text-lg">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default AccountCreated;
