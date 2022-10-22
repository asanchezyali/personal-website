import React from "react";
import NextImage from "next/image";
import Image from "next/image";
import { siteMetadata } from "@/data/siteMetadata";
import { LanguageContext } from "@/providers/LanguageProvider";

interface ArticleOverviewProps {
  title: string;
  summary: string;
  date: string;
  headerImage: string;
  slug: string;
}

export default function ArticleOverview({
  title,
  summary,
  date,
  headerImage,
  slug,
}: ArticleOverviewProps) {
  const { language } = React.useContext(LanguageContext);
  return (
    <div className="flex flex-col border-b border-dashed border-slate-200 dark:border-slate-700 py-8">
      <div className="relative h-[300px] w-full hover:scale-[1.005] ease-in duration-500">
        <Image
          src={`${headerImage}`}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-lg"
        />
      </div>
      <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-300 my-2">
        {title}
      </h1>
      <div className="flex flex-row w-full py-4">
        <div className="hidden md:block">
          <NextImage
            src="/avatar.jpeg"
            alt="Avatar"
            height={50}
            width={50}
            className="h-10 w-10 rounded-full "
          />
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col">
            <p className="text-base font-bold text-slate-800 dark:text-slate-300 px-0 md:px-4">
              Alejandro Sánchez Yalí
            </p>
            <p className="text-base font-light text-slate-800 dark:text-slate-300 px-0 md:px-4">
              {siteMetadata[language].date(date)}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-base text-right font-bold text-slate-800 dark:text-slate-300">
              {siteMetadata[language].readingTime(5)}
            </p>
            <p className="text-base text-right font-light text-slate-800 dark:text-slate-300">
              {siteMetadata[language].views(5)}
            </p>
          </div>
        </div>
      </div>

      <p className="text-base font-light text-slate-800 dark:text-slate-300 text-justify">
        {summary}
      </p>
      <p className="text-base font-semibold text-sky-700 dark:text-sky-500 pt-2">
        {siteMetadata[language].readMore}
      </p>
    </div>
  );
}
