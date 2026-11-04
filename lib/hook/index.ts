/**
 * Hooks barrel export
 */

// Query Provider
export { QueryProvider } from "./QueryProvider";

// Auth hooks
export {
  useProfile,
  useLogin,
  useRegister,
  useLogout,
  useUpdateProfile,
  useChangePassword,
  authKeys,
} from "./useAuth";

// User hook (state management)
export { default as useUser } from "./useUser";

// Rooms hooks
export {
  useRooms,
  useRoom,
  useMyBookings,
  useCreateBooking,
  useCreateRoomRating,
  roomsKeys,
  bookingKeys,
} from "./useRooms";
