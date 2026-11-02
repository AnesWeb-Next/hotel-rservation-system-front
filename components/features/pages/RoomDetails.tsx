"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { assets, facilityIcons } from "@/assets/assets";
import { LoadingSpinner } from "@/components/shared";
import { useCreateBooking, useRoom } from "@/lib/hook";
import { useAppSelector } from "@/lib/store";

function localDateString(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

const RoomDetails = () => {
  const params = useParams<{ id: string }>();
  const roomId = typeof params.id === "string" ? params.id : "";
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const { data: room, isLoading, error } = useRoom(roomId);
  const bookingMutation = useCreateBooking();
  const [mainImage, setMainImage] = useState<string | undefined>();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestsCount, setGuestsCount] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone ?? "");
  const [message, setMessage] = useState("");

  if (isLoading) return <LoadingSpinner />;

  if (error || !room) {
    return (
      <div className="py-28 px-4 text-center">
        <p className="text-lg text-gray-600">
          {error instanceof Error ? error.message : "Room not found"}
        </p>
        <Link className="mt-4 inline-block underline" href="/rooms">
          Back to rooms
        </Link>
      </div>
    );
  }

  const hotel = typeof room.hotel === "object" ? room.hotel : undefined;
  const roomIdForBooking = room._id;
  const images = (room.images ?? []).filter(
    (image): image is string => typeof image === "string",
  );
  const selectedImage = mainImage ?? images[0];
  const pricePerNight = Math.max(
    0,
    room.price.base - (room.price.discount ?? 0),
  );
  const today = localDateString(new Date());

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!user) {
      sessionStorage.setItem(
        "redirectAfterLogin",
        `${window.location.pathname}${window.location.search}`,
      );
      router.push("/auth/login");
      return;
    }

    try {
      await bookingMutation.mutateAsync({
        roomId: roomIdForBooking,
        checkInDate,
        checkOutDate,
        guestsCount,
        phoneNumber,
      });
      setMessage("Booking request submitted. You can track it in My Bookings.");
    } catch (bookingError) {
      setMessage(
        bookingError instanceof Error
          ? bookingError.message
          : "Could not create your booking.",
      );
    }
  }

  return (
    <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          {hotel?.name ?? room.title}
        </h1>
        <p className="mt-2 text-gray-600">{room.title}</p>
      </div>

      <div className="flex items-center gap-1 text-gray-500 mt-2">
        <Image src={assets.locationIcon} alt="" />
        <span>
          {hotel?.address ?? hotel?.city ?? "Hotel location unavailable"}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt={`${room.title} room`}
              width={1000}
              height={700}
              unoptimized
              className="w-full rounded-xl shadow-lg object-cover"
            />
          ) : (
            <div className="flex min-h-64 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
              No room photos available
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {images.slice(1).map((image) => (
            <button
              type="button"
              onClick={() => setMainImage(image)}
              key={image}
              aria-label="Select room photo"
              className="overflow-hidden rounded-xl"
            >
              <Image
                src={image}
                alt={`${room.title} room`}
                width={500}
                height={350}
                unoptimized
                className="w-full rounded-xl shadow-md object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">{room.title}</h2>
          <p className="mt-3 max-w-3xl text-gray-600">{room.description}</p>
          <div className="flex flex-wrap items-center mt-4 mb-6 gap-3">
            {(room.amenities ?? []).map((amenity) => {
              const icon = facilityIcons[amenity as keyof typeof facilityIcons];
              return (
                <div
                  key={amenity}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                >
                  {icon && <Image src={icon} alt="" className="h-5 w-5" />}
                  <p className="text-xs">{amenity}</p>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-2xl font-medium">${pricePerNight}/night</p>
      </div>

      <form
        onSubmit={submitBooking}
        className="flex flex-col gap-4 bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-8 max-w-6xl"
      >
        <h3 className="text-xl font-semibold">Request a booking</h3>
        <div className="flex flex-wrap items-end gap-4 text-gray-700">
          <label className="flex flex-col gap-1">
            Check-in
            <input
              type="date"
              min={today}
              value={checkInDate}
              onChange={(event) => setCheckInDate(event.target.value)}
              required
              className="rounded border border-gray-300 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1">
            Check-out
            <input
              type="date"
              min={checkInDate || today}
              value={checkOutDate}
              onChange={(event) => setCheckOutDate(event.target.value)}
              required
              className="rounded border border-gray-300 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1">
            Guests
            <input
              type="number"
              min={1}
              max={room.maxPeople}
              value={guestsCount}
              onChange={(event) => setGuestsCount(Number(event.target.value))}
              required
              className="w-24 rounded border border-gray-300 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1">
            Phone number
            <input
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
              className="rounded border border-gray-300 px-3 py-2"
            />
          </label>
          <button
            type="submit"
            disabled={bookingMutation.isPending || !room.isAvailable}
            className="rounded-md bg-primary px-6 py-3 text-white transition hover:bg-primary-dull disabled:cursor-not-allowed disabled:opacity-60"
          >
            {bookingMutation.isPending ? "Submitting..." : "Request booking"}
          </button>
        </div>
        {!room.isAvailable && (
          <p className="text-red-600">This room is currently unavailable.</p>
        )}
        {message && <p role="status">{message}</p>}
      </form>
    </div>
  );
};

export default RoomDetails;
