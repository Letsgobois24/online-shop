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
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDobouncedKeyword] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filter, setFilter] = useState({
    gender: { men: true, women: true },
  });
  const [isSidebar, setIsSidebar] = useState(true);

  // Filter Product
  let filteredProducts;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDobouncedKeyword(keyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  if (products.length > 0) {
    filteredProducts = products.filter((product) => {
      const { men, women } = filter.gender;
      if (product.category === "men" && !men) return false;
      if (product.category === "women" && !women) return false;
      if (!product.name.toLowerCase().includes(debouncedKeyword.toLowerCase()))
        return false;
      return true;
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
    <div className="h-main">
      <div className="flex">
        <ProductSidebar
          filter={filter}
          setFilter={setFilter}
          isSidebar={isSidebar}
          setIsSidebar={setIsSidebar}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <main className={`${isSidebar && "sm:ml-64"} w-full p-6`}>
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
            <div className="w-full flex items-center justify-center h-[50vh]">
              <Icon icon="loading" size={36} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
