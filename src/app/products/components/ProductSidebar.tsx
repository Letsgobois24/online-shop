import Icon from "@/components/Elements/Icon";
import Logo from "@/components/Elements/Logo";
import SidebarTemplate from "@/components/Fragments/Sidebar/Template";
import { Dispatch, SetStateAction } from "react";

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
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
};

const ProductSidebar = ({
  filter,
  setFilter,
  isSidebar,
  setIsSidebar,
  keyword,
  setKeyword,
}: PropsType) => {
  return (
    <SidebarTemplate isSidebar={isSidebar} setIsSidebar={setIsSidebar}>
      <div className="h-nav flex items-center">
        <Logo />
      </div>
      <div className="py-5.5">
        <h2 className="font-semibold tracking-wider mb-2">All Products</h2>
        <nav className="mb-3">
          <div className="flex mb-2">
            <div className="relative w-full">
              <input
                type="search"
                className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-full border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search Products"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
              />
              <button
                type="button"
                className="absolute flex justify-center items-center top-0 end-0 aspect-square h-full font-medium text-white bg-blue-700 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300"
              >
                <Icon icon="search" size={16} />
              </button>
            </div>
          </div>

          <h3 className="">Gender</h3>
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
