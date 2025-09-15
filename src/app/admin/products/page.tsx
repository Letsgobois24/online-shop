"use client";

import Button from "@/components/Elements/Button";
import Icon from "@/components/Elements/Icon";
import Title from "@/components/Elements/Title";
import productsServices from "@/services/products/services";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/product.type";
import { convertToIDR } from "@/utils/currency";

export default function AdminproductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  // const [updateData, setUpdateData] = useState(false);

  const getAllData = async () => {
    const res = await productsServices.getAllProducts();
    console.log(res);
    setProducts(res.data.data);
  };
  console.log({ products });
  useEffect(() => {
    getAllData();
  }, []);
  // useEffect(() => {
  //   if (updateData) {
  //     getAllData();
  //     setUpdateData(false);
  //   }
  // }, [updateData]);

  return (
    <>
      <div className="w-full">
        <Title>Products Management</Title>
        <div className="relative overflow-x-auto mt-6">
          {Object.keys(products).length > 0 ? (
            <table className="w-full text-center text-gray-500">
              <thead className="text-sm text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th rowSpan={2} className="py-1 px-2 border-2 border-white">
                    #
                  </th>
                  <th rowSpan={2} className="py-1 px-2 border-2 border-white">
                    Image
                  </th>
                  <th rowSpan={2} className="py-1 px-2 border-2 border-white">
                    Name
                  </th>
                  <th rowSpan={2} className="py-1 px-2 border-2 border-white">
                    Category
                  </th>
                  <th rowSpan={2} className="py-1 px-2 border-2 border-white">
                    Price
                  </th>
                  <th colSpan={2} className="py-1 px-2 border-2 border-white">
                    Stock
                  </th>
                  <th rowSpan={2} className="py-1 px-2 border-2 border-white">
                    Action
                  </th>
                </tr>
                <tr>
                  <th className="py-1 px-2 border-2 border-white">Size</th>
                  <th className="py-1 px-2 border-2 border-white">Qty</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <>
                    <tr
                      key={product.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td rowSpan={product.stock.length} className="py-1 px-2">
                        {index + 1}
                      </td>
                      <td rowSpan={product.stock.length} className="py-1 px-2">
                        <Image
                          src={product.image}
                          alt="Sepatu Super"
                          width={150}
                          height={150}
                          className="mx-auto"
                        />
                      </td>
                      <td rowSpan={product.stock.length} className="py-1 px-2">
                        {product.name}
                      </td>
                      <td rowSpan={product.stock.length} className="py-1 px-2">
                        {product.category}
                      </td>
                      <td rowSpan={product.stock.length} className="py-1 px-2">
                        {convertToIDR(product.price)}
                      </td>
                      <td>{product.stock[0].size}</td>
                      <td>{product.stock[0].qty}</td>
                      <td rowSpan={product.stock.length} className="py-1 px-2">
                        <Button
                          padding="small"
                          className="h-fit inline-block mr-2"
                        >
                          <Icon icon="edit" size={20} />
                        </Button>
                        <Button
                          type="button"
                          padding="small"
                          variant="danger"
                          className="h-fit inline-block"
                        >
                          <Icon icon="delete" size={20} />
                        </Button>
                      </td>
                    </tr>
                    {product.stock.map((stk, index) => (
                      <>
                        {index > 0 && (
                          <tr>
                            <td>{stk.size}</td>
                            <td>{stk.qty}</td>
                          </tr>
                        )}
                      </>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full flex je">
              <Icon icon="loading" size={24} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
