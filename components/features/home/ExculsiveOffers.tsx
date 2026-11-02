import { assets, exclusiveOffers } from "@/assets/assets";
import Title from "@/components/shared/Title";
import Image from "next/image";
import React from "react";

const ExculsiveOffers = () => {
  return (
    <div
      className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32
    pt-20 pbs-32"
    >
      <div
        className="flex flex-col md:flex-row items-center justify-between
      w-full"
      >
        <Title
          align="left"
          title="Exclusive Offers"
          subTitle="Take advantage of
        our limited-time offers and special package to enhance your stay and
        create inforgettable memories"
        />
        <button
          className="group flex items-center gap-2 font-medium cursor-pointer
        max-md:mt-12"
        >
          View All Offers
          <Image
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="group relative flex flex-col items-start
  justify-between gap-1 pt-12 md:pt-16 px-4 rounded-xl text-white
  bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image.src})` }}
          >
            <p
              className="px-3 py-1 absolute top-4 left-4 text-xs bg-white
                text-gray-800 font-medium rounded-full"
            >
              {item.priceOff}% OFF
            </p>
            <div>
              <p className="text-2xl font-medium">{item.title}</p>
              <p>{item.description}</p>
              <p className="text-xs text-white/70 mt-3">
                Expires {item.expiryDate}
              </p>
            </div>
            <button
              className="flex items-center gap-2 font-medium
            cursor-pointer mt-4 mb-5"
            >
              View Offers
              <Image
                src={assets.arrowIcon}
                alt="arrow-icon"
                className="invert group-hover:translate-x-1
                transition-all"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExculsiveOffers;
