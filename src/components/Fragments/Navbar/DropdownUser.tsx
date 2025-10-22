import { signOut } from "next-auth/react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import Dropdown from "./Dropdown";

type PropsType = {
  dropDownUser: boolean;
  setDropDownUser: Dispatch<SetStateAction<boolean>>;
};

export default function DropdownUser({
  dropDownUser,
  setDropDownUser,
}: PropsType) {
  return (
    <Dropdown dropDown={dropDownUser} setDropDown={setDropDownUser}>
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
    </Dropdown>
  );
}
