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
};

const ProductSidebar = ({ filter, setFilter, isSidebar }: PropsType) => {
  return (
    <aside
      className={`${
        isSidebar ? "" : "-translate-x-64"
      } transition duration-300 fixed top-0 bg-blue-900 w-64 text-white font-sans h-screen flex-col px-6 py-5.5`}
    >
      <h2 className="font-semibold tracking-wider mt-[12vh]">All Products</h2>
      <nav className="">
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
    </aside>
  );
};

export default ProductSidebar;
