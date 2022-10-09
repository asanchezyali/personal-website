import React from "react";

export const LanguageContext = React.createContext({
    language: "en",
    setLanguage: (language: string) => {},
});

export const LanguageProvider = ({ children }: any) => {
    const [language, setLanguage] = React.useState("en");

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}
