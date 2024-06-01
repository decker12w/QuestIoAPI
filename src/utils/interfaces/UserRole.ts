const userType = {
  ADMIN: 'USER',
  REGULAR: 'PROFESSOR',
  PREMIUM: 'ADMIN'
} as const;

export type UserRole = (typeof userType)[keyof typeof userType];
