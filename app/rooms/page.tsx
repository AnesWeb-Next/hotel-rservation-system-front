import { AllRooms } from "@/components/features/pages";
import { fetchRooms } from "@/lib/api/server";

export default async function RoomsPage() {
  let initialRooms: RoomsResponse | undefined;

  try {
    initialRooms = await fetchRooms();
  } catch (error) {
    console.error("Failed to preload room listings", error);
  }

  return <AllRooms initialRooms={initialRooms} />;
}
