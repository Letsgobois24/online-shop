"use client";

import Icon from "@/components/Elements/Icon";
import Title from "@/components/Elements/Title";
import productsServices from "@/services/products/services";
import { ProductType } from "@/types/product.type";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import ProductSidebar from "./components/ProductSidebar";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const getAllData = async () => {
    const res = await productsServices.getAllProducts();
    setProducts(res.data.data);
  };
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="flex">
      <ProductSidebar />
      <main className="w-full p-6">
        <Title>Products Page</Title>
        {Object.keys(products).length > 0 ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
            {products.map((product) => (
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
  );
}
