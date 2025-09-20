import Image from "next/image";
import type { ProductType } from "@/types/product.type";
import { convertToIDR } from "@/utils/currency";
import Link from "next/link";

export default function Card({ product }: { product: ProductType }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-xl group">
      <Link href={"products/" + product.id}>
        <div className="overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
            className="group-hover:scale-125 rounded-t-lg w-full object-cover h-50"
          />
        </div>

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h5>
          <p className="mb-2 font-normal text-gray-700">{product.category}</p>
          <p className="mb-2 font-semibold text-gray-900">
            {convertToIDR(product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}
