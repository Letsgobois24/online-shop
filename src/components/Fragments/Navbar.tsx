import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../Elements/Button";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-blue-900">
      <ul className="h-17 flex justify-end items-center space-x-3 px-4">
        {status === "authenticated" ? (
          <>
            <li className="text-white text-sm">{session?.user?.fullname}</li>
            <Button
              onClick={() => signOut()}
              type="button"
              variant="primary"
              className="w-fit text-sm font-semibold"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => signIn()}
            type="button"
            variant="primary"
            className="w-fit text-sm font-semibold"
          >
            Sign In
          </Button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
