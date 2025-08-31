"use client";

import { signOut } from "next-auth/react";
import Button from "../Elements/Button";
import Icon from "../Elements/Icon";
import type { IconName } from "../Elements/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type ListsType = Array<{
  title: string;
  url: string;
  icon: IconName;
}>;

const Sidebar = ({ lists }: { lists: ListsType }) => {
  const pathname = usePathname();

  return (
    <aside className="bg-blue-900 w-65 text-white font-sans h-screen flex flex-col p-6">
      <h2 className="text-center font-semibold text-2xl pb-5">Admin Panel</h2>
      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col space-y-2">
          {lists.map((list, index) => (
            <li
              key={index}
              className={`${
                pathname === list.url ? "bg-blue-500" : "hover:bg-blue-700"
              } rounded-lg cursor-pointer`}
            >
              <Link
                href={list.url}
                className="flex space-x-2.5 items-center px-3 py-2"
              >
                <Icon icon={list.icon} size={24} />
                <h5>{list.title}</h5>
              </Link>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => signOut()}
          type="button"
          variant="primary"
          className="w-fit mx-auto font-semibold"
        >
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
