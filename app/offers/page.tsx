import { exclusiveOffers } from "@/assets/assets";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Offers | Hotel Booking",
  description: "Explore current hotel stay packages and special offers.",
};

export default function OffersPage() {
  return (
    <main className="min-h-screen px-6 pb-20 pt-32 md:px-16 lg:px-24 xl:px-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-sky-700">
            SPECIAL OFFERS
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900 md:text-5xl">
            Make your next stay even more special
          </h1>
          <p className="mt-4 text-gray-600">
            Explore getaway packages and savings, then browse available rooms
            to plan your stay.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {exclusiveOffers.map((offer) => (
            <article
              id={`offer-${offer._id}`}
              key={offer._id}
              className="scroll-mt-28 overflow-hidden rounded-2xl bg-gray-900 bg-cover bg-center text-white shadow-lg"
              style={{ backgroundImage: `url(${offer.image.src})` }}
            >
              <div className="bg-gray-950/60 p-8 md:p-12">
                <p className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-900">
                  Save {offer.priceOff}%
                </p>
                <h2 className="mt-5 text-2xl font-semibold md:text-3xl">
                  {offer.title}
                </h2>
                <p className="mt-3 max-w-2xl text-white/90">
                  {offer.description}
                </p>
                <p className="mt-4 text-sm text-white/75">
                  Offer ends {offer.expiryDate}
                </p>
                <Link
                  href="/rooms"
                  className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                >
                  Browse available rooms
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Looking for a different stay?{" "}
          <Link href="/rooms" className="font-medium text-sky-700 underline">
            Explore all available rooms
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
