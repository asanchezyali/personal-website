import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/providers/LanguageProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import { siteMetadata } from "@/data/siteMetadata";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
    <LanguageProvider>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </LanguageProvider>
    </ThemeProvider>
  );
}

export default MyApp;
