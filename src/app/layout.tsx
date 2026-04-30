import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import StickyActions from "./components/StickyActions";
import { SidebarProvider } from "./components/SidebarContext";

const chillax = localFont({
  src: [
    { path: "./assets/fonts/Chillax-Extralight.ttf", weight: "200", style: "normal" },
    { path: "./assets/fonts/Chillax-Light.ttf", weight: "300", style: "normal" },
    { path: "./assets/fonts/Chillax-Regular.ttf", weight: "400", style: "normal" },
    { path: "./assets/fonts/Chillax-Medium.ttf", weight: "500", style: "normal" },
    { path: "./assets/fonts/Chillax-Semibold.ttf", weight: "600", style: "normal" },
    { path: "./assets/fonts/Chillax-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-chillax",
  display: "swap",
});

const helveticaNeue = localFont({
  src: [
    {
      path: "./assets/fonts/HELVETICANEUELTPRO-CN.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/HELVETICANEUELTPRO-CNO.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Purple Phase | Building Brands Since 2010",
  description: "Official website for Purple Phase Communications",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${chillax.variable} ${helveticaNeue.variable}`}>
      <body className="min-h-screen flex flex-col font-body">
        <SidebarProvider>
          <StickyActions />
          {children}
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}