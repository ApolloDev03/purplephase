export default function PrivacyPolicyPage() {
  const privacyItems = [
    {
      title: "Information Collection",
      description:
        "We may collect personal information such as your name, email address, and contact details when you fill out forms or subscribe to our services.",
    },
    {
      title: "Use of Information",
      description:
        "The information we collect is used to provide and improve our services, respond to inquiries, and send marketing updates with your consent.",
    },
    {
      title: "Data Security",
      description:
        "We implement strong security measures to protect your personal data from unauthorized access or breaches.",
    },
    {
      title: "Third-Party Sharing",
      description:
        "We do not sell or share your personal information with third parties, except when required by law or for service provision purposes (such as website hosting).",
    },
    {
      title: "Cookies",
      description:
        "Our website may use cookies to enhance your browsing experience and analyze website traffic.",
    },
    {
      title: "Your Rights",
      description:
        "You have the right to request access to, correction of, or deletion of your personal data at any time.",
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
            Privacy Policy
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
            At Purple Phase Communications, your privacy is of utmost importance
            to us. This policy outlines how we collect, use, and protect your
            personal information when you interact with our website.
          </p>
        </div>

        {/* Listing */}
        <div className="space-y-4">
          {privacyItems.map((item, index) => (
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
            For any privacy-related concerns, please contact us at{" "}
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