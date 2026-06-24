import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import StickyActions from "./components/StickyActions";
import { SidebarProvider } from "./components/SidebarContext";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
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
    <html
      lang="en"
      className={montserrat.variable}
      suppressHydrationWarning={true}
    >
      <body
        className="min-h-screen flex flex-col font-body"
        suppressHydrationWarning={true}
      >
        <SidebarProvider>
          <StickyActions />
          <Header />
          {children}
          <Footer />
        </SidebarProvider>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
      </body>
    </html>
  );
}