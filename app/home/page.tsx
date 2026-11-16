import ExculsiveOffers from "@/components/features/home/ExculsiveOffers";
import ExploreRoom from "@/components/features/home/ExploreRoom";
import HeroSection from "@/components/features/home/HeroSection";
import NewLetters from "@/components/features/home/NewLetters";
import Testimonial from "@/components/features/home/Testimonial";
import BookingGuide from "@/components/features/home/BookingGuide";
import { fetchHomeRooms } from "@/lib/api/server";

export default async function Home() {
  let initialRooms: RoomsResponse | undefined;

  try {
    initialRooms = await fetchHomeRooms();
  } catch (error) {
    console.error("Failed to preload featured rooms", error);
  }

  return (
    <>
      <main>
        <HeroSection />
        <ExploreRoom initialRooms={initialRooms} />
        <BookingGuide />
        <ExculsiveOffers />
        <Testimonial />
        <NewLetters />
      </main>
    </>
  );
}
