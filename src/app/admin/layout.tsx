import { type ReactNode } from "react";
import { ListsType } from "@/components/Fragments/Sidebar/Sidebar";
import ManagementLayout from "@/components/Layout/ManagementLayout";

const listSidebarItem: ListsType = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "dashboard",
    page: "Admin Page",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bag",
    page: "Products Management",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "users",
    page: "Users Management",
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: "order",
    page: "Orders Management",
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ManagementLayout listSidebarItem={listSidebarItem} title="Admin">
      {children}
    </ManagementLayout>
  );
}
