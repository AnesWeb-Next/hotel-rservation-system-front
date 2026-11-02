/**
 * User role types
 */
declare type UserRole = "admin" | "user";

/**
 * Borrow status types - tracks borrow lifecycle
 */
declare type BookingStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "checked_out"
  | "cancelled"
  | "no_show";

/**
 * Payment status types
 */
declare type PaymentStatus = "pending" | "partial" | "paid" | "refunded";

/**
 * Payment method types
 */
declare type PaymentMethod = "cash_on_delivery";
