import type { ReactNode } from "react";
import { FileX } from "lucide-react";

interface EmptyStateProps {
  /** Title to display */
  title?: string;
  /** Description text */
  description?: string;
  /** Icon to display */
  icon?: ReactNode;
  /** Action button or other content */
  children?: ReactNode;
}

/**
 * EmptyState component - displays when there's no data
 */
export function EmptyState({
  title = "No data found",
  description = "There are no items to display at the moment.",
  icon,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        {icon ?? <FileX className="h-8 w-8 text-muted-foreground" />}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {children}
    </div>
  );
}
