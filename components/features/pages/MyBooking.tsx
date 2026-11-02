"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { useMyBookings } from "@/lib/hook";

function BookingRows() {
  const { data, isLoading, error } = useMyBookings();

  if (isLoading) {
    return <p className="py-12 text-center text-gray-500">Loading bookings...</p>;
  }
  if (error) {
    return (
      <p role="alert" className="py-12 text-center text-red-600">
        {error instanceof Error ? error.message : "Could not load bookings."}
      </p>
    );
  }
  if (!data?.data.length) {
    return (
      <div className="py-12 text-center text-gray-500">
        <p>You do not have any bookings yet.</p>
        <Link href="/rooms" className="mt-3 inline-block text-primary underline">
          Browse available rooms
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mt-8 w-full text-gray-800">
      <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
        <div>Room</div>
        <div>Date &amp; stay</div>
        <div>Booking status</div>
      </div>
      {data.data.map((booking) => {
        const room = typeof booking.room === "string" ? undefined : booking.room;
        const hotel =
          room && typeof room.hotel === "object" ? room.hotel : undefined;
        return (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {room?.images?.[0] ? (
                <Image
                  src={room.images[0]}
                  alt={room.title}
                  width={220}
                  height={150}
                  unoptimized
                  className="rounded shadow object-cover md:w-44"
                />
              ) : (
                <div className="flex h-36 w-44 items-center justify-center rounded bg-gray-100 text-sm text-gray-500">
                  No photo
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <p className="font-semibold text-xl">
                  {hotel?.name ?? room?.title ?? "Room"}
                </p>
                <p className="text-sm text-gray-500">
                  {hotel?.address ?? hotel?.city ?? room?.title}
                </p>
                <p className="text-sm">Guests: {booking.guestsCount}</p>
                <p className="text-base">Total: ${booking.totalPrice}</p>
              </div>
            </div>
            <div className="flex flex-row md:items-center md:gap-8 mt-3 gap-8">
              <div>
                <p>Check-in</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p>Check-out</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center pt-3">
              <p className="capitalize">{booking.status.replaceAll("_", " ")}</p>
              <p className="mt-1 text-sm text-gray-500">
                Payment: {booking.paymentStatus}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const MyBooking = () => (
  <AuthGuard>
    <div className="py-28 md:pb-36 md:pt-32 px-4 md:px-24 xl:px-32">
      <h1 className="font-bold text-4xl md:text-[40px]">My Bookings</h1>
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
        View your booking requests, stay dates, and payment status.
      </p>
      <BookingRows />
    </div>
  </AuthGuard>
);

export default MyBooking;
