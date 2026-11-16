import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/hook/QueryProvider";
import { StoreProvider } from "@/lib/store/provider";
import AppShell from "@/app/_components/AppShell";

export const metadata: Metadata = {
  title: "Book Management Library",
  description: "Manage your book collection with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StoreProvider>
          <QueryProvider>
            <AppShell>{children}</AppShell>
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
