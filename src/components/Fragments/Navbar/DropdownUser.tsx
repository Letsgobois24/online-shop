import { signOut } from "next-auth/react";
import Link from "next/link";

type PropsType = {
  dropDownUser: boolean;
};

export default function DropdownUser({ dropDownUser }: PropsType) {
  return (
    <div
      className={`${
        dropDownUser ? "" : "hidden"
      } absolute bg-gray-50 right-2 mt-5 rounded-sm border border-gray-300`}
    >
      {/* Dropdown User */}
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
  );
}
