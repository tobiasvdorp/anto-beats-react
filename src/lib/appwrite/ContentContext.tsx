import { createContext, useState, useEffect, ReactNode } from "react";
import { getAllContent } from "./api"; // Importeer je API-functie

export const ContentContext = createContext({});

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      const fetchedContent = await getAllContent();
      setContent(fetchedContent);
    };

    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
};
