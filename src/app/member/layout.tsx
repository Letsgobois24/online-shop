import { type ReactNode } from "react";
import { type ListsType } from "@/components/Fragments/Sidebar/Sidebar";
import ManagementLayout from "@/components/Layout/ManagementLayout";

const listSidebarItem: ListsType = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "dashboard",
    page: "Member Dashboard",
  },
  {
    title: "Orders",
    url: "/member/orders",
    icon: "order",
    page: "Orders Page",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: "user",
    page: "User Profile",
  },
];

export default function MemberLayout({ children }: { children: ReactNode }) {
  return (
    <ManagementLayout listSidebarItem={listSidebarItem} title="Member">
      {children}
    </ManagementLayout>
  );
}
