import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signIn, signInWithGoogle } from "@/services/services";
import { compare } from "bcrypt";
import type { Session, User } from "next-auth";
// import { NextAuthOptions } from "next-auth";

const authOptions: any = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await signIn(email);

        if (user) {
          if (user.password && (await compare(password, user.password))) {
            return user;
          }
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: User;
      account: { provider: "credentials" | "google" };
      user: User;
    }) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.phone = user.phone;
        token.role = user.role || "member";
      }

      if (account?.provider === "google") {
        const data = await signInWithGoogle({
          fullname: user.name,
          email: user.email,
          type: "google",
        });

        token.email = data.email;
        token.fullname = data.fullname;
        token.role = data.role || "member";
        token.phone = data.phone;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: User }) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("phone" in token) {
        session.user.phone = token.phone;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
