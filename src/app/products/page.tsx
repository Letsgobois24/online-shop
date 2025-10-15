"use client";

import Icon from "@/components/Elements/Icon";
import Title from "@/components/Elements/Title";
import productsServices from "@/services/products/services";
import { ProductType } from "@/types/product.type";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import ProductSidebar from "./components/ProductSidebar";
import Button from "@/components/Elements/Button";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filter, setFilter] = useState({
    gender: { men: true, women: true },
  });
  const [isSidebar, setIsSidebar] = useState(true);

  // Filter Product
  let filteredProducts;
  if (products.length > 0) {
    filteredProducts = products.filter((product) => {
      const { men, women } = filter.gender;
      if (product.category === "men" && men) return true;
      if (product.category === "women" && women) return true;

      return false;
    });
  }

  const getAllData = async () => {
    const res = await productsServices.getAllProducts();
    setProducts(res.data.data);
  };
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="h-[88vh]">
      <div className="flex">
        <ProductSidebar
          filter={filter}
          setFilter={setFilter}
          isSidebar={isSidebar}
        />
        <main className={`${isSidebar ? "ml-64" : ""} w-full p-6`}>
          <div className="flex justify-between">
            <Title>Products Page</Title>
            <Button
              padding="medium"
              variant="white"
              className="flex items-center space-x-0.5"
              onClick={() => setIsSidebar(!isSidebar)}
            >
              <Icon icon="filter" size={20} />
              <span className="font-semibold">Filter</span>
            </Button>
          </div>
          {Object.keys(products).length > 0 ? (
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
              {filteredProducts?.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <Icon icon="loading" size={24} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
