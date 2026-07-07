// import { Check } from "lucide-react";

// interface ThankYouProps {
//   message: string;
//   tagline: string;
// }

// export default function ThankYou({
//   message,
//   tagline,
// }: ThankYouProps) {
//   return (
//     <main className="flex-1 bg-[#efefef]">
//       <section className="min-h-[70vh] flex items-center justify-center px-6">
//         <div className="text-center max-w-full">
//           <div className="flex justify-center mb-8">
//             <div className="w-32 h-32 rounded-full border-[10px] border-[#9b1c71] flex items-center justify-center">
//               <Check
//                 size={60}
//                 className="text-gray-400"
//                 strokeWidth={3}
//               />
//             </div>
//           </div>

//           <h1 className="text-[#9b1c71] font-bold text-[58px] mb-5">
//             THANK YOU !
//           </h1>

//           <p className="text-gray-700 text-[28px] mb-4">
//             {message}
//           </p>

//           <h1 className="text:xl xl:text-[40px] font-semibold text-[#424242]">
//             {tagline}
//           </h1>
//         </div>
//       </section>
//     </main>
//   );
// }

import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface ThankYouProps {
  message: ReactNode;
  tagline: string;
}

export default function ThankYou({ message, tagline }: ThankYouProps) {
  return (
 <main className="flex-1 bg-[#efefef]">
  <section className="flex min-h-[70vh] items-center justify-center px-6">
    <div className="max-w-full text-center">
      <div className="mb-8 flex justify-center">
        <div className="flex h-[163px] w-[163px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#EDC1DB_0%,#961965_48%,#46082D_100%)] p-[10px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#efefef]">
            <Check
              size={80}
              className="text-[#b8b2a8]"
              strokeWidth={4}
            />
          </div>
        </div>
      </div>

      <h1 className="mb-5 text-[58px] font-bold text-[#9b1c71]">
        THANK YOU !
      </h1>

      <p className="mb-4 text-[28px] text-gray-700">{message}</p>

      <h1 className="text-xl font-bold text-[#424242] xl:text-[40px]">
        {tagline}
      </h1>
    </div>
  </section>
</main>
  );
}