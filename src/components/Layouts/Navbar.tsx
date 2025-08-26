import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-blue-900">
      <ul className="h-15 flex justify-end items-center space-x-3 px-4">
        {status === "authenticated" ? (
          <>
            <li className="text-white text-sm">{session?.user?.fullname}</li>
            <button
              onClick={() => signOut()}
              className="font-semibold rounded-md font-sans text-white px-3 py-1 bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="font-semibold rounded-md font-sans text-white px-3 py-1 bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Sign In
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
