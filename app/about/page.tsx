import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About QuickStay | Hotel Booking",
  description:
    "Learn how QuickStay helps travelers explore rooms and manage booking requests.",
};

const principles = [
  {
    title: "Clear room details",
    description:
      "Review photos, location, amenities, and nightly prices before choosing a stay.",
  },
  {
    title: "Straightforward planning",
    description:
      "Choose dates and guest numbers, then send a booking request from the room page.",
  },
  {
    title: "Useful trip updates",
    description:
      "Keep track of stay dates, booking status, payment status, and post-stay ratings.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-slate-50 px-6 pb-20 pt-36 md:px-16 md:pb-28 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-sky-700">
            ABOUT QUICKSTAY
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-gray-900 md:text-6xl">
            A more considered way to plan your next stay
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            QuickStay brings room listings, property details, and booking tools
            together in one place. Explore your options, request the dates that
            work for you, and keep your reservation details close at hand.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/rooms"
              className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Explore available rooms
            </Link>
            <Link
              href="/experience"
              className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-sky-700">
              WHAT MATTERS TO US
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
              Every step should feel clear
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {principles.map((principle, index) => (
              <article
                key={principle.title}
                className="rounded-2xl border border-gray-200 p-6"
              >
                <p className="text-sm font-semibold tracking-widest text-sky-700">
                  0{index + 1}
                </p>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">
                  {principle.title}
                </h3>
                <p className="mt-3 leading-7 text-gray-600">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
