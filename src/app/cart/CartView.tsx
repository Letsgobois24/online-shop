"use client";

import Title from "@/components/Elements/Title";
import React, { useEffect, useState } from "react";
import type { CartType } from "@/types/cart.type";
import { ProductType, StockType } from "@/types/product.type";
import userServices from "@/services/user/service";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { convertToIDR } from "@/utils/currency";
import Icon from "@/components/Elements/Icon";
import Button from "@/components/Elements/Button";
import { useToaster } from "@/context/ToasterContext";
import Link from "next/link";
import fetchProducts from "../../utils/fetch/fetchProducts";
import duplicateCart from "./utils/duplicateCart";

export default function CartView() {
  const [cart, setCart] = useState<CartType[] | []>([]);
  const [debouncedCart, setDebouncedCart] = useState<CartType[] | []>([]);
  const [productCart, setProductCart] = useState<
    (CartType & ProductType)[] | []
  >([]);
  const [isUpdateCart, setIsUpdateCart] = useState(false);
  const { data: session } = useSession();
  const { showToaster } = useToaster();

  const getSubtotalPrice = () => {
    const totalPrice = productCart.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    return totalPrice;
  };
  const taxRatio = 12;
  const subtotalPrice = getSubtotalPrice();
  const taxPrice = (taxRatio / 100) * subtotalPrice;
  const deliveryPrice = 15000;
  const totalPrice = subtotalPrice + taxPrice + deliveryPrice;

  const handleDeleteCart = async (id: string, size: number) => {
    setIsUpdateCart(true);
    const newCart = cart.filter(
      (item) => item.product_id !== id || item.size !== size
    );
    const newProductCart = productCart.filter(
      (item) => item.product_id !== id || item.size !== size
    );
    setCart(newCart);
    setProductCart(newProductCart);
  };

  const handleChangeCart = async (latestCart: CartType[]) => {
    try {
      const res = await userServices.updateCart(latestCart);
      showToaster("success", res.data.message);
    } catch (err: any) {
      showToaster("danger", err.response.data.message);
    }
  };

  // Handle Quantity Update
  const handleQtyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: CartType & ProductType
  ) => {
    setIsUpdateCart(true);
    const changeProductIdx = productCart.findIndex(
      (product) =>
        product.product_id === item.product_id && product.size === item.size
    );
    const newProductCart = [...productCart];
    newProductCart[changeProductIdx] = {
      ...item,
      qty: Number(e.currentTarget.value),
    };

    const newCart = duplicateCart(newProductCart);
    setCart(newCart);
    setProductCart(newProductCart);
  };

  // Handle Size Update
  const handleSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    item: CartType & ProductType
  ) => {
    setIsUpdateCart(true);
    const targetValue = Number(e.currentTarget.value);
    const changeProductIdx = productCart.findIndex(
      (product) =>
        product.product_id === item.product_id && product.size === item.size
    );

    const tempCart = productCart.map((product, idx) => {
      if (idx !== changeProductIdx) {
        return product;
      }
      return { product_id: "", size: "" };
    });

    const sameSizeIdx = tempCart.findIndex(
      (product) =>
        product.product_id === item.product_id && product.size === targetValue
    );
    const newProductCart = [...productCart];

    if (sameSizeIdx !== -1) {
      newProductCart[changeProductIdx] = {
        ...item,
        size: targetValue,
        qty: item.qty + newProductCart[sameSizeIdx].qty,
      };
      newProductCart.splice(sameSizeIdx, 1);
    } else {
      newProductCart[changeProductIdx] = {
        ...item,
        size: targetValue,
      };
    }

    const newCart = duplicateCart(newProductCart);
    setCart(newCart);
    setProductCart(newProductCart);
  };

  const findMaxQty = (size: number, stock: StockType[]) => {
    return stock.find((item) => item.size === size)?.qty;
  };

  useEffect(() => {
    const getCart = async () => {
      const res = await userServices.getCart();
      setCart(res.data.data);
    };

    if (session) getCart();
  }, [session]);

  useEffect(() => {
    if (cart.length > 0 && !isUpdateCart) {
      fetchProducts(cart, setProductCart);
    }
  }, [cart.length]);

  // Handle Change Cart
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCart(cart);
    }, 1500);

    return () => clearTimeout(handler);
  }, [cart]);

  useEffect(() => {
    if (isUpdateCart) {
      handleChangeCart(debouncedCart);
      setIsUpdateCart(false);
    }
  }, [debouncedCart]);

  return (
    <div className="flex flex-col sm:flex-row gap-12 mx-auto max-w-3xl w-full">
      {/* Cart */}
      <section className="flex-2 w-full">
        <Title size="medium">Cart</Title>
        <div>
          {productCart ? (
            <>
              {productCart.map((item) => (
                <div key={`${item.product_id}-${item.size}`}>
                  <div className="my-2 flex items-center space-x-3">
                    <Image
                      priority
                      src={item.image || "/image/empty-image.png"}
                      alt={item.name || "Product Image"}
                      width={130}
                      height={50}
                      className="rounded-sm object-cover"
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
                          <label
                            htmlFor={`size-${item.product_id}-${item.size}`}
                          >
                            Size
                          </label>
                          <select
                            name="size"
                            id={`size-${item.product_id}-${item.size}`}
                            value={item.size}
                            onChange={(e) => handleSizeChange(e, item)}
                            className="w-12"
                          >
                            {item.stock.map((stock) => (
                              <option
                                key={stock.size}
                                value={stock.size}
                                disabled={stock.qty == 0}
                                className={
                                  stock.qty == 0 ? "text-gray-400" : ""
                                }
                              >
                                {stock.size}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex space-x-1">
                          <label
                            htmlFor={`qty-${item.product_id}-${item.size}`}
                          >
                            Quantity
                          </label>
                          <input
                            min="1"
                            max={findMaxQty(item.size, item.stock)}
                            type="number"
                            id={`qty-${item.product_id}-${item.size}`}
                            name="qty"
                            value={item.qty}
                            className="w-12"
                            onChange={(e) => handleQtyChange(e, item)}
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() =>
                            handleDeleteCart(item.product_id, item.size)
                          }
                          className="cursor-pointer"
                        >
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
                </div>
              ))}
              {productCart.length !== cart.length && (
                <div className="flex justify-center max-w-3xl w-full">
                  <Icon icon="loading" size={32} />
                </div>
              )}
            </>
          ) : (
            <div className="h-[50vh] flex justify-center items-center">
              <p className="font-semibold text-2xl text-gray-500">
                Your cart is empty
              </p>
            </div>
          )}
        </div>
      </section>
      {/* Summary */}
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
          <span className="font-sans">{convertToIDR(taxPrice)}</span>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex justify-between items-center font-semibold">
          <span>Total</span>
          <span className="font-sans">{convertToIDR(totalPrice)}</span>
        </div>
        <hr className="my-6 border-gray-300" />
        <Link href="/checkout">
          <Button className="w-full" variant="dark">
            Checkout
          </Button>
        </Link>
      </section>
    </div>
  );
}
