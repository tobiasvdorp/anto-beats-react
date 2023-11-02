import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";

const App = () => {
  return (
    <>
      <main>
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-in" element={<SignupForm />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Private routes */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </main>
    </>
  );
};

export default App;
