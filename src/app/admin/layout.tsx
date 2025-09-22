import type { ReactNode } from "react";
import Sidebar from "@/components/Fragments/Sidebar";
import { ListsType } from "@/components/Fragments/Sidebar";

const listSidebarItem: ListsType = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bag",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "users",
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} title="Admin Panel" />
      <div className="py-8 px-10 w-full ml-64">{children}</div>
    </div>
  );
}
