import AuthTitle from "../components/AuthTitle";
import AuthLink from "../components/AuthLink";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthTitle>Create New Account</AuthTitle>
      {children}
      <AuthLink isLoginPage={false} />
    </>
  );
}
