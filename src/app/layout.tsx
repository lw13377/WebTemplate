import type { Metadata } from "next";
import { Inter, Roboto, Lato, Poppins, Open_Sans, Raleway, Montserrat, Playfair_Display, Merriweather, Source_Serif_4 } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: ["300", "400", "500", "700"] });
const lato = Lato({ subsets: ["latin"], variable: "--font-lato", weight: ["300", "400", "700"] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["300", "400", "500", "600", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const merriweather = Merriweather({ subsets: ["latin"], variable: "--font-merriweather", weight: ["300", "400", "700"] });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" });

export const metadata: Metadata = {
  title: "ResumeForge — Build Professional Resumes in Minutes",
  description: "Create stunning resumes with 50 professionally designed templates. Customize colors, fonts, and content. Download as PDF.",
  openGraph: {
    title: "ResumeForge — Build Professional Resumes in Minutes",
    description: "Create stunning resumes with 50 professionally designed templates.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = [
    inter, roboto, lato, poppins, openSans, raleway,
    montserrat, playfairDisplay, merriweather, sourceSerif,
  ].map((f) => f.variable).join(" ");

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fontVars} font-sans antialiased`}>
        <TooltipProvider>
          {children}
          <Toaster richColors closeButton />
        </TooltipProvider>
      </body>
    </html>
  );
}
