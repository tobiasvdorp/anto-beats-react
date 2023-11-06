import { createContext, useContext, useEffect, useState } from "react";
import { account } from "@/lib/appwrite/config";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const loggedIn = await account.createEmailSession(email, password);
    setUser(loggedIn);
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    window.location.reload();
  }

  async function register(email, password, name) {
    // Gebruik de 'name' parameter om de gebruikersnaam op te slaan in de voorkeuren
    const response = await account.create("unique()", email, password, name);
    setUser(response);
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}
