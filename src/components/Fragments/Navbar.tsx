import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../Elements/Button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Elements/Icon";
import { useState } from "react";

const NavItem = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Products",
    link: "/products",
  },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [dropDownUser, setDropDownUser] = useState(false);

  return (
    <nav className="bg-blue-900 text-white flex justify-between items-center px-6 h-[12vh]">
      <h1 className="font-bold tracking-wider text-xl z-10">LetsgoboisShop</h1>
      <ul className="flex font-semibold space-x-8">
        {NavItem.map((item, index) => (
          <li
            key={index}
            className={`transition duration-300 py-1 ${
              pathname === item.link
                ? "border-b -translate-y-1"
                : "hover:text-gray-200"
            }`}
          >
            <span className={pathname === item.link ? "" : ""}>
              <Link href={item.link}>{item.name}</Link>
            </span>
          </li>
        ))}
      </ul>
      {status === "authenticated" ? (
        <div>
          <div className="relative flex space-x-4 items-center">
            <div
              className={`${
                pathname === "/cart"
                  ? "border-b bg-white rounded-full text-gray-900"
                  : "hover:text-gray-200 text-white"
              } cursor-pointer w-9 h-9`}
            >
              <Link
                href="/cart"
                className="w-full h-full flex justify-center items-center"
              >
                <Icon icon="cart" size={20} />
              </Link>
            </div>
            <div
              className="flex space-x-1 items-center cursor-pointer"
              onClick={() => setDropDownUser(!dropDownUser)}
            >
              <Image
                src={session.user.image || "/logo/person-logo.png"}
                alt="Profile Image"
                width={35}
                height={35}
                className="rounded-full w-10 h-10"
              />
              <div className="relative">
                <div className=" text-white hover:text-gray-100">
                  <Icon
                    icon="dropDown"
                    size={20}
                    className={`transition duration-200 ${
                      dropDownUser ? "-rotate-180" : ""
                    }`}
                  ></Icon>
                </div>
                <div
                  className={`${
                    dropDownUser ? "" : "hidden"
                  } absolute bg-gray-50 right-2 mt-5 rounded-md border border-gray-300`}
                >
                  <ul>
                    <li className="border-b border-b-gray-300 h-10 w-26 hover:bg-gray-100">
                      <Link
                        href="/member/profile"
                        className="cursor-pointer h-full flex items-center justify-center"
                      >
                        Profile
                      </Link>
                    </li>
                    <li
                      onClick={() => signOut()}
                      className=" h-10 w-26 hover:bg-gray-100 cursor-pointer flex items-center justify-center"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </nav>
  );
};

export default Navbar;
