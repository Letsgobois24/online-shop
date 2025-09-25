import type { ReactNode } from "react";
import Sidebar from "@/components/Fragments/Sidebar";
import { type ListsType } from "@/components/Fragments/Sidebar";

const listSidebarItem: ListsType = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "dashboard",
  },
  {
    title: "Orders",
    url: "/member/orders",
    icon: "order",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: "user",
  },
];

export default function MemberLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} title="Member Panel" />
      <div className="py-8 px-10 w-screen h-screen ml-0 sm:ml-64">
        {children}
      </div>
    </div>
  );
}
