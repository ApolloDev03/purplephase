// import ThankYou from "../components/ThankYou";

// export default function InquiryThankYouPage() {
//   return (
//     <ThankYou
//       message="We have received your message and will reach out soon."
//       tagline="Looking forward to the coffee and the conversation."
//     />
//   );
// }


import ThankYou from "../components/ThankYou";
import Script from "next/script";

export default function InquiryThankYouPage() {
  return (
    <>
      <Script id="gtag-conversion-inquiry" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('event', 'conversion', {'send_to': 'AW-983583154/tYw8CJLu7rYYELKTgdUD'});
        `}
      </Script>
      <ThankYou
        message="We have received your message and will reach out soon."
        tagline="Looking forward to the coffee and the conversation."
      />
    </>
  );
}