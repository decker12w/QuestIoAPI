const accountType = {
  ADMIN: 'USER',
  REGULAR: 'PROFESSOR',
  PREMIUM: 'ADMIN'
} as const;

export type UserRole = (typeof accountType)[keyof typeof accountType];
