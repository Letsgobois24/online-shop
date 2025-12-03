import { Metadata } from "next";
import SignUpView from "./SignUpView";

export const metadata: Metadata = {
  title: "Create New Account",
  description:
    "Join Letsgobois Shop today. Create a free account to access thousands of products and get exclusive vouchers for new users.",
};

export default function SignUpPage() {
  return <SignUpView />;
}
