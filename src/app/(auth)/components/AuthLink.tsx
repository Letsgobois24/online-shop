import Link from "next/link";

export default function AuthLink({ isLoginPage }: { isLoginPage: boolean }) {
  return (
    <p className="text-center text-sm font-light text-gray-500">
      <span className="mr-1">
        {isLoginPage ? "Don’t have an account?" : "Have an account?"}
      </span>
      <Link
        href={isLoginPage ? "/signup" : "/signin"}
        className="font-medium text-blue-600 hover:underline"
      >
        {isLoginPage ? "Sign up" : "Sign in"}
      </Link>
    </p>
  );
}
