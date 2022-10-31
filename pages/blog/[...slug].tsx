import fs from "fs";
import PageTitle from "@/components/PageTitle";
import SectionWrapper from "@/components/Wrappers/SectionWrapper";
import generateRss from "@/lib/generate-rss";
import { MDXLayoutRenderer } from '@/components/MDXComponents'

export default function Blog() {
  return (
    <>
    {
    <SectionWrapper>
      <div className="pt-20">
        <h1 className="text-whites">My Blog</h1>
      </div>
    </SectionWrapper>
    }
    </>
  );
}
