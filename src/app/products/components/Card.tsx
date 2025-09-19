import Image from "next/image";
import type { ProductType } from "@/types/product.type";
import { convertToIDR } from "@/utils/currency";

export default function Card({ product }: { product: ProductType }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Image
        src={product.image}
        alt={product.name}
        width={100}
        height={100}
        className="rounded-t-lg w-full object-cover h-50"
      />

      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </a>
        <p className="mb-2 font-normal text-gray-700">{product.category}</p>
        <p className="mb-2 font-semibold text-gray-900">
          {convertToIDR(product.price)}
        </p>
      </div>
    </div>
  );
}
