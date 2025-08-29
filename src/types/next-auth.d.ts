import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullname?: string | null;
      role?: string | null;
      email?: string | null;
      phone?: string | null;
      type?: "google";
    };
  }

  interface User {
    id?: string;
    fullname?: string | null;
    role?: "member" | "admin";
    email: string;
    phone?: string | null;
    password?: string;
    type?: "google";
    created_at?: Date;
    updated_at?: Date;
  }
}
