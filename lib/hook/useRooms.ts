"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBooking,
  getMyBookings,
  getRooms,
  getRoom,
} from "@/lib/api/rooms";

/**
 * Query key factory for rooms
 */
export const roomsKeys = {
  all: ["rooms"] as const,
  lists: () => [...roomsKeys.all, "list"] as const,
  list: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) =>
    [...roomsKeys.lists(), params] as const,
  details: () => [...roomsKeys.all, "detail"] as const,
  detail: (id: string) => [...roomsKeys.details(), id] as const,
};

export const bookingKeys = {
  all: ["bookings"] as const,
  mine: () => [...bookingKeys.all, "mine"] as const,
};

/**
 * Hook to get all rooms
 */
export function useRooms(params?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  return useQuery({
    queryKey: roomsKeys.list(params),
    queryFn: () => getRooms(params),
  });
}

/**
 * Hook to get a single room
 */
export function useRoom(id: string) {
  return useQuery({
    queryKey: roomsKeys.detail(id),
    queryFn: () => getRoom(id),
    enabled: !!id,
  });
}

export function useMyBookings() {
  return useQuery({
    queryKey: bookingKeys.mine(),
    queryFn: () => getMyBookings(),
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.mine() });
    },
  });
}
