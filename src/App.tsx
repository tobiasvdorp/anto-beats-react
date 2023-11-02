import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/ui/navbar";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <main>
          <Routes>
            {/* Public routes */}
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SigninForm />} />
              <Route path="/sign-up" element={<SignupForm />} />
            </Route>

            <Route element={<RootLayout />}></Route>

            {/* Private routes */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
        </main>
      </ThemeProvider>
    </>
  );
};

export default App;
