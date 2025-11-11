"use client";

import Button from "@/components/Elements/Button";
import Icon from "@/components/Elements/Icon";
import productsServices from "@/services/products/services";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/product.type";
import ProductsTable from "./components/ProductsTable";
import ModalAddProduct from "./components/ModalAddProducts";

export default function AdminproductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updateData, setUpdateData] = useState(false);

  const getAllData = async () => {
    const res = await productsServices.getAllProducts();
    setProducts(res.data.data);
  };
  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (updateData) {
      getAllData();
      setUpdateData(false);
    }
  }, [updateData]);

  return (
    <>
      <div className="flex justify-end">
        <Button padding="medium" onClick={() => setModalAddProduct(true)}>
          <span className="mr-1.5 text-2xl">+</span>Add Product
        </Button>
      </div>
      <div className="relative overflow-x-auto mt-6">
        {Object.keys(products).length > 0 ? (
          <ProductsTable products={products} setUpdateData={setUpdateData} />
        ) : (
          <div className="w-full flex justify-center items-center h-[50vh]">
            <Icon icon="loading" size={36} />
          </div>
        )}
      </div>
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setUpdateData={setUpdateData}
        />
      )}
    </>
  );
}
