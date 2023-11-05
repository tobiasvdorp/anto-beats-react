import { Link } from "react-router-dom";

const AccountCreated = () => {
  return (
    <div className="h-screen flex justify-center">
      <div className="flex flex-col items-center w-full justify-center mt-auto mb-auto overflow-auto p-2">
        <h1 className="dark:text-white text-black text-4xl font-bold font-main text-center mb-5">
          Account created succesfully!
        </h1>
        <Link to="/sign-in" className="btn-secondary btn w-40">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default AccountCreated;
