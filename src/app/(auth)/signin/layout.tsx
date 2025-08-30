import AuthTitle from "../components/AuthTitle";
import AuthLink from "../components/AuthLink";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthTitle>Sign in to your account</AuthTitle>
      {children}
      <AuthLink isLoginPage={true} />
    </>
  );
}
