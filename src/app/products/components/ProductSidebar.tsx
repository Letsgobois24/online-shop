import Logo from "@/components/Elements/Logo";
import SidebarTemplate from "@/components/Fragments/Sidebar/Template";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type FilterType = {
  gender: {
    men: boolean;
    women: boolean;
  };
};

type PropsType = {
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  isSidebar: boolean;
  setIsSidebar: Dispatch<SetStateAction<boolean>>;
};

const ProductSidebar = ({
  filter,
  setFilter,
  isSidebar,
  setIsSidebar,
}: PropsType) => {
  return (
    <SidebarTemplate isSidebar={isSidebar} setIsSidebar={setIsSidebar}>
      <div className="h-nav flex items-center">
        <Logo />
      </div>
      <div className="py-5.5">
        <h2 className="font-semibold tracking-wider ">All Products</h2>
        <nav>
          <h3 className="my-1">Gender</h3>
          <div className="flex flex-col space-y-1">
            <div className="flex space-x-2">
              <input
                type="checkbox"
                id="men"
                checked={filter.gender.men}
                onChange={() =>
                  setFilter({
                    gender: {
                      men: !filter.gender.men,
                      women: filter.gender.women,
                    },
                  })
                }
              />
              <label className="text-sm" htmlFor="men">
                Men
              </label>
            </div>
            <div className="flex space-x-2">
              <input
                type="checkbox"
                id="women"
                checked={filter.gender.women}
                onChange={() =>
                  setFilter({
                    gender: {
                      men: filter.gender.men,
                      women: !filter.gender.women,
                    },
                  })
                }
              />
              <label className="text-sm" htmlFor="women">
                Women
              </label>
            </div>
          </div>
        </nav>
      </div>
    </SidebarTemplate>
  );
};

export default ProductSidebar;
