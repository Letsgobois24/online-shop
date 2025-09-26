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
import Button from "@/components/Elements/Button";
import { useToaster } from "@/context/ToasterContext";
import Link from "next/link";
import { UserType } from "@/types/user.type";
import ModalChangeAddress from "./components/ModalChangeAddress";

export default function CheckoutPage() {
  const [profile, setProfile] = useState<UserType | null>(null);
  const [productCart, setProductCart] = useState<
    (CartType & ProductType)[] | []
  >([]);
  const [selectedAddress, setSelectedAddress] = useState<number>(0);
  const [modalChangeAddress, setModalChangeAddress] = useState(false);

  const { data: session } = useSession();
  const { showToaster } = useToaster();

  const getSubtotalPrice = () => {
    const totalPrice = productCart.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    return totalPrice;
  };
  console.log({ profile });
  const taxRatio = 12;
  const subtotalPrice = getSubtotalPrice();
  const taxPrice = (taxRatio / 100) * subtotalPrice;
  const deliveryPrice = 15000;
  const totalPrice = subtotalPrice + taxPrice + deliveryPrice;

  useEffect(() => {
    const getCart = async () => {
      const res = await userServices.getProfile();
      const profile: UserType = res.data.data;
      setProfile(profile);
      const mainAddressIdx = profile.address.findIndex(
        (address) => address.isMain === true
      );
      setSelectedAddress(mainAddressIdx);
    };

    if (session) getCart();
  }, [session]);

  const cart = profile?.cart || [];
  const address = profile?.address[selectedAddress || 0];

  useEffect(() => {
    if (cart.length > 0) {
      const getProductImage = async () => {
        const missingItem = cart.some((item) =>
          productCart.some(
            (p) => p.product_id !== item.product_id || p.size !== item.size
          )
        );
        if (!missingItem) {
          const newCart = await Promise.all(
            cart.map(async (item) => {
              const res = await productsServices.getProduct(item.product_id);
              return { id: item.product_id, ...item, ...res.data.data };
            })
          );
          setProductCart(newCart);
        }
      };

      getProductImage();
    }
  }, [cart]);

  return (
    <>
      <div className="flex space-x-12 mx-auto max-w-3xl w-full">
        <section className="flex-2">
          <Title size="medium">Checkout</Title>
          <div className="border border-gray-300 px-3 py-2 rounded-md">
            <h4 className="font-semibold mb-2">Shipping Address</h4>
            <h6>
              {address?.recipient} - {address?.phone}
            </h6>
            <p className="text-sm">{address?.addressLine}</p>
            <p className="text-sm mb-3">Note: {address?.note}</p>
            <Button
              onClick={() => setModalChangeAddress(true)}
              variant="dark"
              className="w-full"
            >
              Change Address
            </Button>
          </div>
          <div>
            {productCart.length > 0 ? (
              productCart.map((item) => (
                <React.Fragment key={`${item.product_id}-${item.size}`}>
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
                      <p className="text-gray-500 mb-2 text-sm">
                        {item.category}
                      </p>
                      <div className="flex space-x-1 text-gray-500 text-sm">
                        <span>Size</span>
                        <span>{item.size}</span>
                      </div>
                      <div className="flex space-x-1 text-gray-500 text-sm">
                        <span>Quantity</span>
                        <span>{item.qty}</span>
                      </div>
                    </div>
                  </div>
                  <hr className="my-3 border-gray-300" />
                </React.Fragment>
              ))
            ) : (
              <div className="h-[50vh] flex justify-center items-center">
                <p className="font-semibold text-2xl text-gray-500">
                  Your cart is empty
                </p>
              </div>
            )}
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
              Process Payment
            </Button>
          </Link>
        </section>
      </div>
      {modalChangeAddress && (
        <ModalChangeAddress
          selectedAddress={selectedAddress}
          address={profile?.address}
          setSelectedAddress={setSelectedAddress}
          setModalChangeAddress={setModalChangeAddress}
        />
      )}
    </>
  );
}
