import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/ui/navbar";
import AccountCreated from "./_auth/forms/AccountCreated";
import Home from "@/pages/Home";
import { UserProvider } from "@/lib/appwrite/user";
import Dashboard from "@/pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  return (
    <>
      <UserProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {/* <Navbar /> */}
          <main className="">
            <Routes>
              {/* Public routes */}
              <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SigninForm />} />
                <Route path="/sign-up" element={<SignupForm />} />
                <Route path="/account-created" element={<AccountCreated />} />
              </Route>

              <Route path="/" element={<Home />}></Route>

              {/* Private routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
        </ThemeProvider>
      </UserProvider>
    </>
  );
};

export default App;
