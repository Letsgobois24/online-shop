"use client";

import Icon from "@/components/Elements/Icon";
import productsServices from "@/services/products/services";
import { ProductType } from "@/types/product.type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { convertToIDR } from "@/utils/currency";
import Button from "@/components/Elements/Button";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import userServices from "@/services/user/service";
import { useToaster } from "@/context/ToasterContext";
import { CartType } from "@/types/cart.type";

type ParamsType = { id: string };
export default function DetailProduct({ params }: { params: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const { showToaster } = useToaster();
  const { status, data: session } = useSession();
  const { id } = React.use(params) as ParamsType;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedSize, setSelectedSize] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<CartType[] | []>([]);

  const handleAddToCart = async () => {
    if (selectedSize) {
      setIsLoading(true);
      const product = cart.find(
        (item) => item.product_id === id && item.size === selectedSize
      );

      let newCart;
      if (product) {
        newCart = cart.map((item: any) =>
          item.product_id === id && item.size === selectedSize
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        newCart = [...cart, { product_id: id, qty: 1, size: selectedSize }];
      }
      setCart(newCart);

      try {
        const res = await userServices.addToCart(
          { cart: newCart },
          session?.accessToken || ""
        );
        if (res) {
          showToaster("success", res.data.message);
        }
      } catch {
        showToaster("danger", "Failed add to cart");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getProductData = async () => {
      const res = await productsServices.getProduct(id);
      setProduct(res.data.data);
    };
    getProductData();
  }, []);

  useEffect(() => {
    if (status == "authenticated") {
      const getCart = async () => {
        const res = await userServices.getCart(session?.accessToken || "");
        setCart(res.data.data);
      };
      getCart();
    }
  }, [status]);

  return (
    <>
      <div className="flex justify-center h-[88vh] items-center">
        {product ? (
          <section className="flex flex-col sm:flex-row sm:space-x-12 space-y-6">
            <Image
              priority
              src={product.image}
              width={450}
              height={450}
              alt="Product Image"
              className="rounded-xl my-auto"
            />
            <div className="w-sm my-auto">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <h5 className="text-lg mb-2 font-sans">{product.category}</h5>
              <h5 className="font-semibold mb-2 font-sans">
                {convertToIDR(product.price)}
              </h5>
              <p className="text-sm mb-4">{product.description}</p>
              <h5 className="font-semibold mb-2 text-sm">Select Size</h5>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {product.stock
                  .sort((a, b) => a.size - b.size)
                  .map((item, index) => (
                    <label key={index} className="w-full">
                      <input
                        type="radio"
                        name="size"
                        value={item.size}
                        className="peer hidden"
                        disabled={item.qty === 0}
                        onClick={() => setSelectedSize(item.size)}
                      />
                      <div className="py-2 border border-gray-400 transition duration-300 peer-checked:border-gray-900 cursor-pointer peer-disabled:cursor-default peer-disabled:text-gray-400 text-center rounded">
                        {item.size}
                      </div>
                    </label>
                  ))}
              </div>
              <Button
                type={status == "unauthenticated" ? "button" : "submit"}
                className="flex space-x-2 w-full"
                isLoading={isLoading}
                onClick={() =>
                  status == "unauthenticated"
                    ? router.push(`/signin?callbackUrl=${pathname}`)
                    : handleAddToCart()
                }
              >
                <Icon icon="cart" size={20} />
                <span>Add To Cart</span>
              </Button>
            </div>
          </section>
        ) : (
          <Icon icon="loading" size={60} />
        )}
      </div>
    </>
  );
}
