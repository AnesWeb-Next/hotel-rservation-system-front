/**
 * Login user credentials
 */
declare interface LoginUserI {
  email: string;
  password: string;
}

/**
 * Register user data
 */
declare interface RegisterUserI extends LoginUserI {
  fullName: string;
  phone?: string;
}

/**
 * Basic user data for creating/updating
 */
declare interface BasicUserI {
  fullName: string;
  displayName?: string;
  email: string;
  DateOfBirth?: string;
  gender?: "male" | "female" | "non-binary" | "prefer-not-to-say";
  phone?: string;
  nationality?: string;
  address?: string;
  avatar?: string;
  role: UserRole;
}

/**
 * Full user interface with all fields (without password)
 */
declare interface UserI extends BasicUserI {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * User with full details (safe to use in client — same as UserI since password is excluded)
 */
declare type SafeUserI = UserI;

/**
 * Data for updating a user profile
 */
declare interface UpdateUserData {
  fullName?: string;
  displayName?: string;
  DateOfBirth?: string | Date;
  gender?: "male" | "female" | "non-binary" | "prefer-not-to-say";
  phone?: string;
  nationality?: string;
  address?: string;
  avatar?: string;
}
