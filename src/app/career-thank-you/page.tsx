// import ThankYou from "../components/ThankYou";

// export default function CareerThankYouPage() {
//   return (
//     <ThankYou
//           message={
//         <>
//           We have received your application. Give us a{" "}
//           <span className="font-semibold">call on +91 78200 85445</span>{" "}
//           and schedule your interview.
//         </>
//       }
//       tagline="This could be the beginning of something great."
//     />
//   );
// }

import ThankYou from "../components/ThankYou";
import Script from "next/script";

export default function CareerThankYouPage() {
  return (
    <>
      <Script id="gtag-conversion-career" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('event', 'conversion', {'send_to': 'AW-983583154/tYw8CJLu7rYYELKTgdUD'});
        `}
      </Script>
      <ThankYou
        message={
          <>
            We have received your application. Give us a{" "}
            <span className="font-semibold">call on +91 78200 85445</span>{" "}
            and schedule your interview.
          </>
        }
        tagline="This could be the beginning of something great."
      />
    </>
  );
}