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

const Sidebar = ({
  lists,
  title = "",
}: {
  lists: ListsType;
  title: string;
}) => {
  const pathname = usePathname();
  const segments = pathname.split("/");

  return (
    <aside className="bg-blue-900 w-64 text-white font-sans h-screen fixed flex-col p-6 hidden sm:flex">
      <h2 className="text-center font-semibold text-2xl pb-5">{title}</h2>
      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col space-y-2">
          {lists.map((list, index) => {
            const listSegment = list.url.split("/");

            return (
              <li
                key={index}
                className={`${
                  segments[1] == listSegment[1] && segments[2] == listSegment[2]
                    ? "bg-blue-500"
                    : "hover:bg-blue-700"
                } rounded-lg cursor-pointer transition duration-300`}
              >
                <Link
                  href={list.url}
                  className="flex space-x-2.5 items-center px-3 py-2"
                >
                  <Icon icon={list.icon} size={24} />
                  <h5>{list.title}</h5>
                </Link>
              </li>
            );
          })}
        </ul>
        <Button
          onClick={() => signOut()}
          type="button"
          variant="primary"
          padding="medium"
          className="mx-auto font-semibold"
        >
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
