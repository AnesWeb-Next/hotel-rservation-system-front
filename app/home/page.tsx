"use client";

import ExculsiveOffers from "@/components/features/home/ExculsiveOffers";
import ExploreRoom from "@/components/features/home/ExploreRoom";
import HeroSection from "@/components/features/home/HeroSection";
import NewLetters from "@/components/features/home/NewLetters";
import Testimonial from "@/components/features/home/Testimonial";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <ExploreRoom />
        <ExculsiveOffers />
        <Testimonial />
        <NewLetters />
      </main>
    </>
  );
}
