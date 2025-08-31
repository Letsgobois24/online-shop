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
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} />
      <div>{children}</div>
    </div>
  );
}
