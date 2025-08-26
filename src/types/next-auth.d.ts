import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullname?: string | null;
      role?: string | null;
      email?: string | null;
      phone?: string | null;
    };
  }

  interface User {
    id: string;
    fullname?: string | null;
    role?: string | null;
    email?: string | null;
    phone?: string | null;
    password?: string | null;
  }
}
