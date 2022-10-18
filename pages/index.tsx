import React from "react";
import type { NextPage } from "next";
import { siteMetadata } from "@/data/siteMetadata";
import SectionWrapper from "@/components/Wrappers/SectionWrapper";
import Overview from "@/components/Overview";
import Image from "@/components/Image";
import { LanguageContext } from "@/providers/LanguageProvider";


const Home: NextPage = () => {
  const { language } = React.useContext(LanguageContext);
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center justify-center h-[20rem] pt-20">
        <div className="hover:scale-[1.02] hover:translate-y-[-10px] ease-in duration-500">
          <Image
            src={siteMetadata.avatar}
            alt="Avatar"
            className="rounded-full h-40 w-40"
          />
        </div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-300 my-2">
          {siteMetadata[language].headerSubtitle}
        </h1>
      </div>
      <Overview />
    </SectionWrapper>
  );
};

export default Home;
