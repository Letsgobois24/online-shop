"use client";

import { signOut } from "next-auth/react";
import Button from "../../Elements/Button";
import Icon from "../../Elements/Icon";
import type { IconName } from "../../Elements/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarTemplate from "./Template";
import { Dispatch, SetStateAction } from "react";

export type ListsType = Array<{
  title: string;
  url: string;
  icon: IconName;
  page?: string;
}>;

type PropsType = {
  lists: ListsType;
  title: string;
  isSidebar: boolean;
  setIsSidebar: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ lists, title = "", isSidebar, setIsSidebar }: PropsType) => {
  const pathname = usePathname();
  const segments = pathname.split("/");

  return (
    <SidebarTemplate isSidebar={isSidebar} setIsSidebar={setIsSidebar}>
      <h2 className="font-semibold text-2xl h-nav flex justify-center items-center">
        {title}
      </h2>
      <div className="flex flex-col justify-between h-main">
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
        <div className="flex">
          <Button
            onClick={() => signOut()}
            type="button"
            variant="primary"
            padding="medium"
            className="mx-auto font-semibold mb-8"
          >
            Sign Out
          </Button>
          <div
            className={
              "cursor-pointer rounded-full w-9 h-9 border-b-2 bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 transition duration-150"
            }
          >
            <Link
              href="/"
              className="w-full h-full flex justify-center items-center"
            >
              <Icon icon="home" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </SidebarTemplate>
  );
};

export default Sidebar;
