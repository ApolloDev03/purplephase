import { Check } from "lucide-react";

interface ThankYouProps {
  message: string;
  tagline: string;
}

export default function ThankYou({
  message,
  tagline,
}: ThankYouProps) {
  return (
    <main className="flex-1 bg-[#efefef]">
      <section className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-full">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full border-[5px] border-[#9b1c71] flex items-center justify-center">
              <Check
                size={45}
                className="text-gray-400"
                strokeWidth={3}
              />
            </div>
          </div>

          <h1 className="text-[#9b1c71] font-bold text-5xl mb-5">
            THANK YOU !
          </h1>

          <p className="text-gray-700 text-lg mb-4">
            {message}
          </p>

          <h1 className="text:xl xl:text-[40px] font-bold text-[#444]">
            {tagline}
          </h1>
        </div>
      </section>
    </main>
  );
}