import { createContext, useContext, useEffect, useState } from "react";
import { account } from "@/lib/appwrite/config";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Admin status state

  async function login(email: string, password: string) {
    const loggedIn = await account.createEmailSession(email, password);
    setUser(loggedIn);
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    window.location.reload();
  }

  async function register(email: string, password: string, name: string) {
    const response = await account.create("unique()", email, password, name);
  }

  async function init() {
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
      checkIfUserIsAdmin();
    } catch (err) {
      setUser(null);
      setIsAdmin(false);
    }
  }

  const checkIfUserIsAdmin = async () => {
    try {
      const user = await account.get();
      const isAdmin = user.labels && user.labels.includes("admin");
      setIsAdmin(isAdmin); // Update admin status in state
    } catch (error) {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ current: user, isAdmin, login, logout, register }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
