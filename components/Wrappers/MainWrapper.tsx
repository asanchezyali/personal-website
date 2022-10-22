import React from "react";
import SectionWrapper from "@/components/Wrappers/SectionWrapper";
import Link from "@/components/Link";
import ThemeSwitch from "@/components/Switches/ThemeSwitch";
import LanguageSwitch from "@/components/Switches/LanguageSwitch";
import MobileNav from "@/components/MobileNav";
import { siteMetadata } from "@/data/siteMetadata";
import { LanguageContext } from "@/providers/LanguageProvider";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const { language } = React.useContext(LanguageContext);
  return (
    <div className="bg-slate-100 dark:bg-slate-800">
      <SectionWrapper className="fixed w-screen bg-slate-200 dark:bg-slate-900 z-10">
        <header className="flex items-center justify-between py-3">
          <Link
            href="/"
            className="text-xl font-medium text-slate-800 dark:text-slate-300"
          >
            {siteMetadata[language].headerTitle}
          </Link>
          <div className="hidden md:block">
            <nav className="flex items-center">
              {siteMetadata[language].headerNavLinks.map(
                (link: { [key: string]: string }) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-light text-slate-800 dark:text-slate-300 px-4"
                  >
                    {link.name}
                  </Link>
                )
              )}
              <span className="text-2xl font-extralight text-slate-800 dark:text-slate-300 px-4">
                |
              </span>
              <LanguageSwitch />
              <ThemeSwitch />
            </nav>
          </div>
          <MobileNav />
        </header>
      </SectionWrapper>
      <main>{children}</main>
    </div>
  );
};

export default LayoutWrapper;
