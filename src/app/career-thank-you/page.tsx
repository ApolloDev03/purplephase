import ThankYou from "../components/ThankYou";

export default function CareerThankYouPage() {
  return (
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
  );
}