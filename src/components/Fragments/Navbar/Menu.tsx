import Link from "next/link";
import { usePathname } from "next/navigation";
import Dropdown from "./Dropdown";
import { Dispatch, SetStateAction } from "react";

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

type PropsType = {
  dropDownMenu: boolean;
  setDropDownMenu: Dispatch<SetStateAction<boolean>>;
};

function DropdownMenu({ dropDownMenu, setDropDownMenu }: PropsType) {
  const pathname = usePathname();

  return (
    <Dropdown dropDown={dropDownMenu} setDropDown={setDropDownMenu}>
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
    </Dropdown>
  );
}

function MainMenu() {
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

export default { DropdownMenu, MainMenu };
