import type { NextPage } from "next";
import { siteMetadata } from "@/data/siteMetadata";
import SectionContainer from "@/components/SectionContainer";
import Image from "@/components/Image";

const Home: NextPage = () => {
  return (
    <SectionContainer className="h-screen">
      <div className="flex flex-col items-center justify-center h-[24rem]">
      <div className="hover:scale-[1.02] hover:translate-y-[-10px] ease-in duration-500">
        <Image src={siteMetadata.avatar} alt="Avatar" className="rounded-full h-40 w-40" />
      </div>
      </div>
    </SectionContainer>
  );
};

export default Home;
