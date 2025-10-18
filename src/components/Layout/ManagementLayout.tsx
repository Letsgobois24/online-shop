"use client";

import { usePathname } from "next/navigation";
import Button from "../Elements/Button";
import Title from "../Elements/Title";
import Sidebar, { ListsType } from "../Fragments/Sidebar/Sidebar";
import { useState } from "react";
import Icon from "../Elements/Icon";

type PropsType = {
  listSidebarItem: ListsType;
  children: React.ReactNode;
  title: "Member" | "Admin";
};

const ManagementLayout = ({ listSidebarItem, children, title }: PropsType) => {
  const [isSidebar, setIsSidebar] = useState(true);
  const pathname = usePathname();
  const getTitle = () => {
    const page = listSidebarItem.find((item) => item.url === pathname);
    return page?.page;
  };

  return (
    <div className="flex">
      <Sidebar
        lists={listSidebarItem}
        title={title + " Panel"}
        isSidebar={isSidebar}
        setIsSidebar={setIsSidebar}
      />
      <div
        className={`${
          isSidebar && "ml-0 sm:ml-64"
        } py-8 px-10 w-screen h-screen`}
      >
        <div className="w-full">
          <div className="flex justify-between">
            <Title>{getTitle()}</Title>
            <Button
              variant="white"
              className="px-3"
              onClick={() => setIsSidebar(!isSidebar)}
            >
              <Icon icon="hamburger" size={20} />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ManagementLayout;
