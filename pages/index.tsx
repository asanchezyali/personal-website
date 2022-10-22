import React from "react";
import type { NextPage } from "next";
import NextImage from "next/image";
import { siteMetadata } from "@/data/siteMetadata";
import SectionWrapper from "@/components/Wrappers/SectionWrapper";
import ArticleOverview from "@/components/ArticleOverview";
import { LanguageContext } from "@/providers/LanguageProvider";
import { getAllFilesFrotMatter } from "@/lib/mdx";

export async function getStaticProps() {
  const posts = await getAllFilesFrotMatter("blog");
  return { props: { posts } };
}

const Home: NextPage = ({ posts }: any) => {
  const { language } = React.useContext(LanguageContext);
  return (
    <SectionWrapper>
      <div className="flex flex-col items-center justify-center h-[20rem] pt-20">
        <div className="hover:scale-[1.01] hover:translate-y-[-3px] ease-in duration-500">
          <NextImage
            src={siteMetadata.avatar}
            alt="Avatar"
            width={200}
            height={200}
            className="rounded-full h-40 w-40"
          />
        </div>
        <h1 className="text-lg text-slate-800 dark:text-slate-300 my-2">
          {siteMetadata[language].headerSubtitle}
        </h1>
      </div>
      {posts
        .filter((post: any) => post.language === language)
        .map((post: any) => (
          <ArticleOverview
            key={post.slug}
            title={post.title}
            summary={post.summary}
            date={post.date}
            headerImage={post.headerImage}
            slug={post.slug}
          />
        ))}
    </SectionWrapper>
  );
};

export default Home;
