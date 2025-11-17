// src/context/AppContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

type AppContextType = {
  language: string;
  currency: string;
  setLanguage: (lang: string) => void;
  setCurrency: (curr: string) => void;
  availabilities: any;
  setAvailabilities: (availabilities: any) => void;
};

const defaultContext: AppContextType = {
  language: "en",
  currency: "EUR",
  setLanguage: () => {},
  setCurrency: () => {},
  availabilities: [],
  setAvailabilities: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: any }> = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("EUR");
  const [availabilities, setAvailabilities] = useState<any>([]);
  // Debug log when values change
  useEffect(() => {
    console.log("AppContext - Currency updated to:", currency);
  }, [currency]);

  return (
    <AppContext.Provider
      value={{
        language,
        currency,
        setLanguage,
        setCurrency,
        availabilities,
        setAvailabilities,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
