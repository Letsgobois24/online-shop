import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../Elements/Button";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-blue-900">
      <ul className="h-17 flex justify-end items-center space-x-4 px-4">
        {status === "authenticated" ? (
          <>
            <li>
              <Link
                href="/member/profile"
                className="flex space-x-3 items-center"
              >
                <Image
                  src={session.user.image || "/logo/person-logo.png"}
                  alt="Profile Image"
                  width={35}
                  height={35}
                  className="rounded-full w-10 h-10"
                />
                <p className="text-white text-sm">{session?.user?.fullname}</p>
              </Link>
            </li>
            <Button
              onClick={() => signOut()}
              type="button"
              variant="primary"
              size="small"
              className="text-sm font-semibold"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => signIn()}
            type="button"
            variant="primary"
            size="small"
            className="text-sm font-semibold"
          >
            Sign In
          </Button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
