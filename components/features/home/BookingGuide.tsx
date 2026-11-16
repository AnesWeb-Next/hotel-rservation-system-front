import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Search,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    label: "DISCOVER",
    title: "Find a stay that fits",
    description:
      "Compare available rooms by photos, location, amenities, and nightly price.",
    example: "Open a room to see its gallery, facilities, and full details.",
    link: "/rooms",
    linkText: "Browse available rooms",
    icon: Search,
  },
  {
    number: "02",
    label: "PLAN",
    title: "Send a booking request",
    description:
      "Choose your dates, enter the number of guests, and request a stay directly from the room page.",
    example: "Your request includes the dates and contact details the property needs.",
    link: "/rooms",
    linkText: "Choose a room",
    icon: CalendarDays,
  },
  {
    number: "03",
    label: "MANAGE",
    title: "Keep plans in one place",
    description:
      "Review your stay dates, booking status, and payment status from My Bookings.",
    example: "After checkout, you can also rate your stay.",
    link: "/booking",
    linkText: "View My Bookings",
    icon: ClipboardList,
  },
];

export default function BookingGuide() {
  return (
    <section className="bg-white px-6 py-20 md:px-16 lg:px-24 xl:px-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-sky-700">
            HOW IT WORKS
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
            From first search to your next great stay
          </h2>
          <p className="mt-4 text-gray-600">
            Explore the booking journey: compare real room details, request your
            dates, and follow your reservation from one account.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="flex flex-col rounded-2xl border border-gray-200 bg-slate-50 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-widest text-gray-400">
                    {step.number} / {step.label}
                  </span>
                  <span className="flex size-11 items-center justify-center rounded-full bg-white text-sky-700 shadow-sm">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {step.description}
                </p>
                <p className="mt-5 border-l-2 border-sky-600 pl-3 text-sm leading-6 text-gray-700">
                  {step.example}
                </p>
                <Link
                  href={step.link}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-sky-700"
                >
                  {step.linkText}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
