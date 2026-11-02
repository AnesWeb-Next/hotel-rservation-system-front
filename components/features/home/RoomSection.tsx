"use client";

import Image from "next/image";
import { assets } from "@/assets/assets";
import Link from "next/link";

interface RoomSectionProps {
  room: RoomI;
  index: number;
}

const RoomSection = ({ room, index }: RoomSectionProps) => {
  const hotel = typeof room.hotel === "object" ? room.hotel : undefined;
  const price = Math.max(0, room.price.base - (room.price.discount ?? 0));
  return (
    <Link
      href={"/rooms/" + room._id}
      onClick={() => scrollTo(0, 0)}
      key={room._id}
      className="relative max-w-72 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,.05)]"
    >
      {room.images?.[0] ? (
        <Image
          src={room.images[0]}
          alt={`${room.title} room`}
          width={600}
          height={400}
          unoptimized
        />
      ) : (
        <div className="flex h-48 items-center justify-center bg-gray-100 text-sm text-gray-500">
          No room photo
        </div>
      )}

      {index % 2 === 0 && (
        <p
          className="px-3 py-1 absolute top-3 left-3 text-xs bg-white
      text-gray-800 font-medium rounded-full"
        >
          Best Seller
        </p>
      )}
      <div className="p-4 pt-5">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-xl text-gray-800">
            {hotel?.name ?? room.title}
          </p>
          <div className="flex items-center gap-1">
            <Image src={assets.starIconFilled} alt="star-icon" />
            4.5
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Image src={assets.locationIcon} alt="location-icon" />
          <span>{hotel?.address ?? hotel?.city ?? "Hotel location unavailable"}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p>
            {" "}
            <span className="text-xl text-gray-800">${price}</span>
            /night
          </p>
          <span
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50
          transition-all cursor-pointer"
          >
            Book Now
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RoomSection;
