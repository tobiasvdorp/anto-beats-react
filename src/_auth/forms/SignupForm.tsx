const SignupForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
  };
  return (
    <>
      <form
        className="h-screen flex flex-col gap-4 items-center justify-center p-5 w-96 pb-8"
        onSubmit={handleSubmit}
      >
        <h1 className="dark:text-white text-black text-3xl font-semibold mb-8">
          Sign up
        </h1>

        <label htmlFor="email" className="w-full text-black dark:text-white">
          E-mail adress <br />
          <input
            type="email"
            id="email"
            className="w-[100%] mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary inputform"
          />
        </label>
        <label htmlFor="password" className="w-full text-black dark:text-white">
          Password <br />
          <input
            type="password"
            id="password"
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary inputform"
          />
        </label>
        <label htmlFor="password" className="w-full text-black dark:text-white">
          Confirm password <br />
          <input
            type="password"
            id="password"
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary inputform"
          />
        </label>
        <button type="submit" className="btn-secondary btn">
          Sign up
        </button>
      </form>
    </>
  );
};

export default SignupForm;
