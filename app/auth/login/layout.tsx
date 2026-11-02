import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Book Management Library",
  description: "Sign in to your Book Management Library account",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
