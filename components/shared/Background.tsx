"use client";

import Image from "next/image";

/**
 * Background component for auth pages
 * Displays a fixed background image covering the entire viewport
 */
export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src="/BG.png"
        alt=""
        fill
        priority
        className="object-cover"
        aria-hidden="true"
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
