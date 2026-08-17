export default function TermsAndConditionsPage() {
  const termsItems = [
    {
      title: "Services Overview",
      description:
        "Purple Phase provides branding, design, and marketing services, and the use of this website is subject to your acceptance of these terms.",
    },
    {
      title: "Intellectual Property",
      description:
        "All content, designs, and materials on this website are the intellectual property of Purple Phase. Unauthorized reproduction, distribution, or modification is prohibited.",
    },
    {
      title: "User Responsibilities",
      description:
        "By using our website, you agree to provide accurate information when requested and refrain from unlawful activities.",
    },
    {
      title: "Limitation of Liability",
      description:
        "Purple Phase will not be held liable for any damages resulting from the use or inability to use this website or our services.",
    },
    {
      title: "Changes to Terms",
      description:
        "Purple Phase reserves the right to update these terms at any time without prior notice.",
    },
  ];

  return (
    <main className="bg-white">
      <section
        className="
          mx-auto
          w-full
          max-w-full
        px-4 py-[20px] lg:py-[30px] 2xl:py-[85px] lg:px-6 xl:px-10 2xl:px-32
        "
      >
        {/* Heading */}
        <div className="mb-10">
          <h1
            className="
              text-[32px]
              font-bold
              leading-tight
              text-primary
              sm:text-[38px]
              lg:text-[46px]
            "
          >
            Terms & Conditions
          </h1>

          <div className="mt-3 h-[3px] w-[70px] rounded-full bg-secondary" />

          <p
            className="
              mt-6
              max-w-[1000px]
              !text-[15px]
              !leading-[1.8]
              !text-[#424242]
              sm:!text-[16px]
            "
          >
            Welcome to Purple Phase Communications! By accessing or using our
            website, you agree to comply with the following terms and
            conditions. These terms outline your use of our services and the
            conditions under which we provide them.
          </p>
        </div>

        {/* Listing */}
        <div className="space-y-4">
          {termsItems.map((item, index) => (
            <div
              key={item.title}
              className="
                group
                flex
                items-start
                gap-4
                rounded-[12px]
                border
                border-[#e8e8e8]
                bg-[#fafafa]
                p-4
                transition-all
                duration-300

                hover:border-primary/30
                hover:bg-white
                hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)]

                sm:gap-5
                sm:p-5

                lg:p-6
              "
            >
              {/* Number */}
              <div
                className="
                  flex
                  h-[42px]
                  w-[42px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-[14px]
                  font-bold
                  text-white
                  transition-all
                  duration-300

                  group-hover:bg-secondary

                  sm:h-[46px]
                  sm:w-[46px]
                  sm:text-[15px]
                "
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2
                  className="
                    !m-0
                    !text-[18px]
                    !font-bold
                    !normal-case
                    !leading-[1.4]
                    !text-[#222]

                    sm:!text-[20px]
                  "
                >
                  {item.title}
                </h2>

                <p
                  className="
                    mt-2
                    !text-[14px]
                    !leading-[1.8]
                    !text-[#555]

                    sm:!text-[15px]
                    lg:!text-[16px]
                  "
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div
          className="
            mt-8
            border-t
            border-[#e5e5e5]
            pt-6
          "
        >
          <p
            className="
              !text-[15px]
              !leading-[1.8]
              !text-[#424242]
              sm:!text-[16px]
            "
          >
            For any questions regarding these terms, please contact us at{" "}
            <a
              href="mailto:info.purplephase@gmail.com"
              className="
                font-semibold
                text-primary
                transition-colors
                hover:text-secondary
                hover:underline
              "
            >
              info.purplephase@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}