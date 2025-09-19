import Button from "@/components/Elements/Button";
import Icon from "@/components/Elements/Icon";
import { ProductType } from "@/types/product.type";
import { convertToIDR } from "@/utils/currency";
import Image from "next/image";
import React, { type Dispatch, type SetStateAction, useState } from "react";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";

export default function ProductsTable({
  products,
  setUpdateData,
}: {
  products: ProductType[];
  setUpdateData: Dispatch<SetStateAction<boolean>>;
}) {
  const [deletedProduct, setDeletedProduct] = useState<ProductType | null>(
    null
  );
  const [updatedProduct, setUpdatedProduct] = useState<ProductType | null>(
    null
  );

  return (
    <>
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
            <React.Fragment key={index}>
              <tr
                key={product.id}
                // className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
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
                    variant="warning"
                    padding="small"
                    onClick={() => setUpdatedProduct(product)}
                    className="h-fit inline-block mr-2"
                  >
                    <Icon icon="edit" size={20} />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setDeletedProduct(product)}
                    padding="small"
                    variant="danger"
                    className="h-fit inline-block"
                  >
                    <Icon icon="delete" size={20} />
                  </Button>
                </td>
              </tr>
              {product.stock.map((stk, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <tr>
                      <td>{stk.size}</td>
                      <td>{stk.qty}</td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {updatedProduct && (
        <ModalUpdateProduct
          setUpdateData={setUpdateData}
          updatedProduct={updatedProduct}
          setUpdatedProduct={setUpdatedProduct}
        />
      )}
      {deletedProduct && (
        <ModalDeleteProduct
          setUpdateData={setUpdateData}
          deletedProduct={deletedProduct}
          setDeletedProduct={setDeletedProduct}
        />
      )}
    </>
  );
}
