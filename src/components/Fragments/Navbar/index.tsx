import { signIn, useSession } from "next-auth/react";
import Button from "../../Elements/Button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../../Elements/Icon";
import { useState } from "react";
import Logo from "../../Elements/Logo";
import DropdownUser from "./DropdownUser";
import { Menu, DropdownMenu } from "./Menu";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [dropDownUser, setDropDownUser] = useState(false);
  const [dropDownMenu, setDropDownMenu] = useState(false);

  return (
    <nav className="z-10 bg-blue-900 text-white flex justify-between items-center px-3 sm:px-6 h-nav">
      <Logo />
      {/* List Menu */}
      <Menu />
      <div className="relative text-gray-900 flex space-x-3 sm:space-x-4 items-center">
        <>
          {status === "authenticated" && (
            <>
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
                onClick={() => {
                  setDropDownUser(!dropDownUser);
                  setDropDownMenu(false);
                }}
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
                  {/* Dropdown User */}
                  <DropdownUser dropDownUser={dropDownUser} />
                </div>
              </div>
            </>
          )}
        </>
        {status !== "authenticated" && (
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
        <button
          className="relative cursor-pointer sm:hidden"
          onClick={() => {
            setDropDownMenu(!dropDownMenu);
            setDropDownUser(false);
          }}
        >
          <Icon icon="hamburger" size={20} className="text-white" />
          {/* Dropdown Menu */}
          <DropdownMenu dropDownMenu={dropDownMenu} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
