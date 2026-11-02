/**
 * Rooms API — real backend calls via apiClient
 */

import { apiClient } from "./client";

/**
 * Get all rooms with optional pagination
 */
export async function getRooms(params?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<RoomsResponse> {
  const { data } = await apiClient.get<{
    success: boolean;
    message: string;
    data: RoomI[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>("/room", {
    params,
  });

  // Transform backend response to match frontend expectations
  return {
    data: data.data,
    total: data.pagination.total,
    page: data.pagination.page,
    limit: data.pagination.limit,
  };
}

/**
 * Get a single room by ID
 */
export async function getRoom(id: string): Promise<RoomI> {
  const { data } = await apiClient.get<{
    success: boolean;
    message: string;
    data: RoomI;
  }>(`/room/${id}`);
  return data.data;
}

export async function getMyBookings(params?: {
  page?: number;
  limit?: number;
}): Promise<BookingListResponse> {
  const { data } = await apiClient.get<{
    success: boolean;
    message: string;
    data: BookingI[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>("/bookings/me", { params });

  return {
    data: data.data,
    total: data.pagination.total,
    page: data.pagination.page,
    limit: data.pagination.limit,
    totalPages: data.pagination.totalPages,
  };
}

export async function createBooking(input: {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  phoneNumber: string;
}): Promise<BookingI> {
  const { data } = await apiClient.post<{
    success: boolean;
    message: string;
    data: BookingI;
  }>("/bookings", input);
  return data.data;
}
