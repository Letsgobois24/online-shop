import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Products",
    link: "/products",
  },
];

export function DropdownMenu({ dropDownMenu }: { dropDownMenu: boolean }) {
  const pathname = usePathname();

  return (
    <div
      className={`${
        dropDownMenu ? "" : "hidden"
      } absolute bg-gray-50 right-2 mt-5 rounded-sm border border-gray-300`}
    >
      <ul>
        {NavItem.map((item, index) => (
          <li
            key={index}
            className={`h-10 w-26 cursor-pointer border-b border-b-gray-300 ${
              pathname === item.link ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <Link
              href={item.link}
              className="cursor-pointer h-full flex items-center justify-center"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Menu() {
  const pathname = usePathname();

  return (
    <ul className="hidden sm:flex font-semibold space-x-8">
      {NavItem.map((item, index) => (
        <li
          key={index}
          className={`transition duration-300 py-1 ${
            pathname === item.link
              ? "border-b -translate-y-1"
              : "hover:text-gray-200"
          }`}
        >
          <span className={pathname === item.link ? "" : ""}>
            <Link href={item.link}>{item.name}</Link>
          </span>
        </li>
      ))}
    </ul>
  );
}
