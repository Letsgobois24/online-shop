"use client";

import Title from "@/components/Elements/Title";
import React, { useEffect, useState } from "react";
import type { CartType } from "@/types/cart.type";
import { ProductType } from "@/types/product.type";
import userServices from "@/services/user/service";
import { useSession } from "next-auth/react";
import productsServices from "@/services/products/services";
import Image from "next/image";
import { convertToIDR } from "@/utils/currency";
import Icon from "@/components/Elements/Icon";
import Button from "@/components/Elements/Button";

export default function CartPage() {
  const [cart, setCart] = useState<CartType[] | []>([]);
  const [productCart, setProductCart] = useState<
    (CartType & ProductType)[] | []
  >([]);
  const { data: session } = useSession();

  const getSubtotalPrice = () => {
    const totalPrice = productCart.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    return totalPrice;
  };

  const taxRatio = 12;
  const subtotalPrice = getSubtotalPrice();
  const deliveryPrice = 15000;
  const totalPrice = subtotalPrice * (1 + taxRatio / 100) + deliveryPrice;

  useEffect(() => {
    const getCart = async () => {
      const res = await userServices.getCart();
      setCart(res.data.data);
    };

    if (session) getCart();
  }, [session]);

  useEffect(() => {
    if (cart.length > 0) {
      const getProductImage = async () => {
        const newCart = await Promise.all(
          cart.map(async (item) => {
            const res = await productsServices.getProduct(item.product_id);
            return { ...item, ...res.data.data };
          })
        );
        setProductCart(newCart);
      };

      getProductImage();
    }
  }, [cart]);

  return (
    <div className="flex space-x-12 mx-auto max-w-3xl w-full">
      <section className="flex-2">
        <Title size="medium">Bag</Title>
        <div>
          {productCart.map((item) => (
            <React.Fragment key={`${item.product_id}-${item.size}`}>
              <div className="my-2 flex items-center space-x-3">
                <Image
                  src={item.image || "/image/empty-image.png"}
                  alt={item.name || "Product Image"}
                  width={130}
                  height={50}
                  className="rounded-sm"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h6 className="font-semibold">{item.name}</h6>
                    <p className="text-sm font-semibold font-sans">
                      {convertToIDR(item.price * item.qty || 0)}
                    </p>
                  </div>
                  <p className="text-gray-500 mb-2">{item.category}</p>
                  <div className="flex space-x-2.5 text-sm text-gray-500 mb-1">
                    <div className="flex space-x-1">
                      <label htmlFor={`size-${item.id}-${item.size}`}>
                        Size
                      </label>
                      <select
                        name="size"
                        id={`size-${item.id}-${item.size}`}
                        defaultValue={item.size}
                        className="w-12"
                      >
                        {item.stock.map((stock) => (
                          <option
                            key={stock.size}
                            value={stock.size}
                            disabled={stock.qty == 0}
                            className={stock.qty == 0 ? "text-gray-400" : ""}
                          >
                            {stock.size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex space-x-1">
                      <label htmlFor={`qty-${item.id}-${item.size}`}>
                        Quantity
                      </label>
                      <input
                        type="number"
                        id={`qty-${item.id}-${item.size}`}
                        name="qty"
                        defaultValue={item.qty}
                        className="w-12"
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <button className="cursor-pointer">
                      <Icon
                        icon="delete"
                        size={18}
                        className="text-gray-400 hover:text-red-500"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <hr className="my-6 border-gray-300" />
            </React.Fragment>
          ))}
        </div>
      </section>
      <section className="flex-1">
        <Title size="medium">Summary</Title>
        <div className="flex justify-between items-center text-sm">
          <span>Subtotal</span>
          <span className="font-sans">{convertToIDR(subtotalPrice)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Delivery</span>
          <span className="font-sans">{convertToIDR(deliveryPrice)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Taxes({taxRatio}%)</span>
          <span className="font-sans">-</span>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex justify-between items-center font-semibold">
          <span>Total</span>
          <span className="font-sans">{convertToIDR(totalPrice)}</span>
        </div>
        <hr className="my-6 border-gray-300" />
        <Button className="w-full" variant="dark">
          Checkout
        </Button>
      </section>
    </div>
  );
}
