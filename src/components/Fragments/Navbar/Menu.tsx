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
          className={` ${
            pathname === item.link
              ? "after:scale-x-100"
              : "after:scale-x-0 after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-gray-100 after:transition after:duration-300 hover:after:scale-x-100"
          } relative inline-block py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-gray-100`}
        >
          <Link href={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default { DropdownMenu, MainMenu };
