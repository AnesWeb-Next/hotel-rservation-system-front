import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Hotel Booking",
  description: "Create a new Book Management Library account",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
