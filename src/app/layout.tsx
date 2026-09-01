
// import type { Metadata } from "next";
// import { Montserrat } from "next/font/google";
// import "./globals.css";
// import Footer from "./components/Footer";
// import StickyActions from "./components/StickyActions";
// import { SidebarProvider } from "./components/SidebarContext";
// import { ToastContainer } from "react-toastify";
// import Header from "./components/Header";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700", "800"],
//   variable: "--font-montserrat",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Purple Phase | Building Brands Since 2010",
//   description: "Official website for Purple Phase Communications",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html
//       lang="en"
//       className={montserrat.variable}
//       suppressHydrationWarning={true}
//     >
//       <body
//         className="min-h-screen flex flex-col font-body"
//         suppressHydrationWarning={true}
//       >
//         {/* Google Tag Manager (noscript) */}
//         <noscript>
//           <iframe
//             src="https://www.googletagmanager.com/ns.html?id=GTM-TL3MW6ZH"
//             height="0"
//             width="0"
//             style={{ display: "none", visibility: "hidden" }}
//           />
//         </noscript>
//         {/* End Google Tag Manager (noscript) */}

//         <SidebarProvider>
//           <StickyActions />
//           <Header />
//           {children}
//           <Footer />
//         </SidebarProvider>

//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           pauseOnHover
//           draggable
//         />
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import Footer from "./components/Footer";
import StickyActions from "./components/StickyActions";
import { SidebarProvider } from "./components/SidebarContext";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import GoogleAdsConversion from "./components/GoogleAdsConversion";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={montserrat.variable}
      suppressHydrationWarning
    >
      <head>
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {
                if(f.fbq)return;
                n=f.fbq=function(){
                  n.callMethod?
                  n.callMethod.apply(n,arguments):
                  n.queue.push(arguments)
                };

                if(!f._fbq)f._fbq=n;

                n.push=n;
                n.loaded=!0;
                n.version='2.0';
                n.queue=[];

                t=b.createElement(e);
                t.async=!0;
                t.src=v;

                s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s);

              }(
                window,
                document,
                'script',
                'https://connect.facebook.net/en_US/fbevents.js'
              );

              fbq('init', '1021695314020034');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* End Meta Pixel Code */}
      </head>

      <body
        className="min-h-screen flex flex-col font-body"
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TL3MW6ZH"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}


        {/* Meta Pixel Noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1021695314020034&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Noscript */}

 <GoogleAdsConversion />
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