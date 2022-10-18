import React from "react";
import { LanguageContext } from "@/providers/LanguageProvider";

const LanguageSwitch = () => {
  const { language, setLanguage } = React.useContext(LanguageContext);

  return (
    <button
      aria-label="Toggle Language"
      type="button"
      className="
        text-base
        font-light 
        text-slate-800 dark:text-slate-300 
        bg-slate-300 dark:bg-slate-800 rounded-md
        px-4 py-1" 
      onClick={() => setLanguage(language === "en" ? "es" : "en")}
    >
      {language === "en" ? "ES" : "EN"}
    </button>
  );
};

export default LanguageSwitch;