"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  /** Current rating value */
  value: number;
  /** Callback when rating changes (interactive mode) */
  onChange?: (value: number) => void;
  /** Whether the rating is read-only */
  readOnly?: boolean;
  /** Maximum number of stars */
  max?: number;
  /** Size of stars */
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

/**
 * StarRating — single component for both display and input.
 * Use `readOnly` for average-rating display, omit it for interactive input.
 */
export function StarRating({
  value,
  onChange,
  readOnly = false,
  max = 5,
  size = "md",
}: StarRatingProps) {
  const [hoveredValue, setHoveredValue] = useState(0);
  const interactive = !readOnly && !!onChange;
  const displayValue = interactive ? hoveredValue || value : value;
  const starSize = sizeClasses[size];

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= Math.round(displayValue);

        if (interactive) {
          return (
            <button
              key={index}
              type="button"
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHoveredValue(starValue)}
              onMouseLeave={() => setHoveredValue(0)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onChange(starValue);
              }}
              aria-label={`Rate ${starValue} out of ${max}`}
            >
              <Star
                className={`${starSize} ${filled ? "fill-amber-400 text-amber-400" : "text-muted"}`}
              />
            </button>
          );
        }

        return (
          <Star
            key={index}
            className={`${starSize} ${filled ? "fill-amber-400 text-amber-400" : "text-muted"}`}
          />
        );
      })}
    </div>
  );
}
