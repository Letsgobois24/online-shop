const ProductSidebar = () => {
  return (
    <aside className="bg-blue-900 w-64 text-white font-sans h-[88vh] flex-col p-6 hidden sm:flex">
      <h2 className="font-semibold tracking-wider">All Products</h2>
      <nav className="">
        <h3 className="my-1">Gender</h3>
        <div className="flex flex-col space-y-1">
          <div className="flex space-x-2">
            <input type="checkbox" id="men" />
            <label className="text-sm" htmlFor="men">
              Men
            </label>
          </div>
          <div className="flex space-x-2">
            <input type="checkbox" id="women" />
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
