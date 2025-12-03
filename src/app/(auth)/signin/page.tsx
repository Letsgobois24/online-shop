import { Metadata } from "next";
import SignInView from "./SignInView";

export const metadata: Metadata = {
  title: "Sign In to Your Account",
  description:
    "Sign in to Letsgobois Shop to access your shopping cart, track orders, and enjoy member-only benefits.",
};

type PropsType = {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
};

export default function SignInPage({ searchParams }: PropsType) {
  return <SignInView searchParams={searchParams} />;
}
