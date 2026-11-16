import { CalendarDays, ClipboardList, Search } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The QuickStay Experience | Hotel Booking",
  description:
    "Explore rooms, request a booking, and follow your stay with QuickStay.",
};

const steps = [
  {
    number: "01",
    title: "Explore available rooms",
    description:
      "Browse room photos, property locations, amenities, and nightly prices to find an option that suits your trip.",
    icon: Search,
  },
  {
    number: "02",
    title: "Request the dates you need",
    description:
      "On a room's detail page, select check-in and check-out dates, enter your guest count and contact number, and submit your request.",
    icon: CalendarDays,
  },
  {
    number: "03",
    title: "Follow your reservation",
    description:
      "Sign in to review your booking dates and status. After your stay, you can leave a rating from My Bookings.",
    icon: ClipboardList,
  },
];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen px-6 pb-20 pt-36 md:px-16 lg:px-24 xl:px-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-sky-700">
            THE QUICKSTAY EXPERIENCE
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-gray-900 md:text-6xl">
            Plan your stay, step by step
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From comparing room details to checking your reservation status,
            QuickStay keeps the essentials of your booking journey together.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="rounded-2xl bg-slate-50 p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-widest text-sky-700">
                    STEP {step.number}
                  </span>
                  <Icon
                    aria-hidden="true"
                    className="size-6 text-sky-700"
                  />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-gray-900">
                  {step.title}
                </h2>
                <p className="mt-3 leading-7 text-gray-600">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>

        <section className="mt-12 flex flex-col gap-5 rounded-2xl bg-gray-900 p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="text-2xl font-semibold">Ready to find your stay?</h2>
            <p className="mt-2 max-w-2xl text-white/75">
              Browse available rooms or explore the latest getaway offers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/rooms"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Browse rooms
            </Link>
            <Link
              href="/offers"
              className="rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View offers
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
