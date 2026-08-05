// import { Check } from "lucide-react";
// import type { ReactNode } from "react";

// interface ThankYouProps {
//   message: ReactNode;
//   tagline: string;
// }

// export default function ThankYou({ message, tagline }: ThankYouProps) {
//   return (
//  <main className="flex-1 bg-[#efefef]">
//   <section className="flex min-h-[70vh] items-center justify-center px-6">
//     <div className="max-w-full text-center">
//       <div className="mb-8 flex justify-center">
//         <div className="flex h-[163px] w-[163px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#EDC1DB_0%,#961965_48%,#46082D_100%)] p-[10px]">
//           <div className="flex h-full w-full items-center justify-center rounded-full bg-[#efefef]">
//             <Check
//               size={80}
//               className="text-[#b8b2a8]"
//               strokeWidth={4}
//             />
//           </div>
//         </div>
//       </div>

//       <h1 className="mb-5 text-[58px] font-bold text-[#9b1c71]">
//         THANK YOU !
//       </h1>

//       <p className="mb-4 text-[28px] text-gray-700">{message}</p>

//       <h1 className="text-xl font-bold text-[#424242] xl:text-[40px]">
//         {tagline}
//       </h1>
//     </div>
//   </section>
// </main>
//   );
// }

import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface ThankYouProps {
  message: ReactNode;
  tagline: string;
}

export default function ThankYou({
  message,
  tagline,
}: ThankYouProps) {
  return (
    <main className="flex-1 bg-[#efefef]">
      <section
        className="
          flex
          min-h-[65vh]
          items-center
          justify-center
          px-4
          py-10

          lg:min-h-[68vh]
          lg:px-6
          lg:py-12

          xl:min-h-[70vh]
          xl:px-10
          xl:py-14

          2xl:min-h-[70vh]
          2xl:px-6
          2xl:py-0
        "
      >
        <div className="mx-auto w-full max-w-[1100px] text-center">
          {/* Success Icon */}
          <div
            className="
              mb-5
              flex
              justify-center

              sm:mb-6
              md:mb-7
              2xl:mb-8
            "
          >
            <div
              className="
                flex
                h-[100px]
                w-[100px]
                items-center
                justify-center
                rounded-full
                bg-[linear-gradient(135deg,#EDC1DB_0%,#961965_48%,#46082D_100%)]
                p-[6px]


                md:h-[140px]
                md:w-[140px]
                md:p-[8px]

                xl:h-[150px]
                xl:w-[150px]
                xl:p-[9px]

                2xl:h-[163px]
                2xl:w-[163px]
                2xl:p-[10px]
              "
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#efefef]">
                <Check
                  className="
                    h-[48px]
                    w-[48px]
                    text-[#b8b2a8]

                  

                    md:h-[68px]
                    md:w-[68px]

                    xl:h-[74px]
                    xl:w-[74px]

                    2xl:h-[80px]
                    2xl:w-[80px]
                  "
                  strokeWidth={4}
                />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1
            className="
              mb-3
              text-[32px]
              font-bold
              leading-tight
              text-[#9b1c71]

              sm:mb-4
              md:text-[40px]

              lg:text-[48px]

              xl:text-[54px]

              2xl:mb-5
              2xl:text-[58px]
            "
          >
            THANK YOU !
          </h1>

          {/* Message */}
          <div
            className="
              mx-auto
              mb-3
              max-w-[900px]
              px-1
              text-[17px]
              leading-[1.5]
              text-gray-700

              md:text-[20px]

              md:mb-4
              md:px-4
              lg:text-[24px]

              xl:text-[26px]

              2xl:px-0
              2xl:text-[28px]
            "
          >
            {message}
          </div>

          {/* Tagline */}
          <h2
            className="
              mx-auto
              max-w-[1000px]
              px-1
              text-[18px]!
              font-bold
              leading-[1.35]
              text-[#424242]

              md:text-[24px]

              md:px-4
              lg:text-[30px]

              xl:text-[36px]

              2xl:px-0
              2xl:text-[40px]
            "
          >
            {tagline}
          </h2>
        </div>
      </section>
    </main>
  );
}