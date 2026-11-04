type StaticImageData = import("next/image").StaticImageData;

/**
 * Room interface
 */
declare interface RoomI {
  _id: string;
  title: string;
  description: string;
  price: {
    base: number;
    discount?: number;
  };
  maxPeople: number;
  amenities?: string[];
  images?: (string | StaticImageData)[];
  isAvailable: boolean;
  hotel?: string | {
    _id?: string;
    name: string;
    city: string;
    address?: string;
  };
  createdAt: string;
  updatedAt: string;
}

declare interface BookingI {
  _id: string;
  room: string | (Omit<RoomI, "hotel"> & {
    hotel?: string | { name: string; city?: string; address?: string };
  });
  checkInDate: string;
  checkOutDate: string;
  status: BookingStatus;
  guestsCount: number;
  totalPrice: number;
  paidAmount?: number;
  paymentStatus: PaymentStatus;
  myRating?: number;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Room list response
 */
declare interface RoomsResponse {
  data: RoomI[];
  total: number;
  page: number;
  limit: number;
}

declare interface BookingListResponse {
  data: BookingI[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
