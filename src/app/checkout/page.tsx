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
import { UserType } from "@/types/user.type";
import ModalChangeAddress from "./components/ModalChangeAddress";
import ChangeAddress from "./components/ChangeAddress";
import Script from "next/script";
import transactionServices from "@/services/transaction/services";
import { useToaster } from "@/context/ToasterContext";

declare global {
  interface Window {
    snap: any;
  }
}

export default function CheckoutPage() {
  const [profile, setProfile] = useState<UserType | null>(null);
  const [productCart, setProductCart] = useState<
    (CartType & ProductType)[] | []
  >([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [modalChangeAddress, setModalChangeAddress] = useState(false);

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
  const taxPrice = Math.round((taxRatio / 100) * subtotalPrice);
  const deliveryPrice = 15000;
  const totalPrice = subtotalPrice + taxPrice + deliveryPrice;

  useEffect(() => {
    const getProfile = async () => {
      const res = await userServices.getProfile();
      const profile: UserType = res.data.data;
      setProfile(profile);
      const mainAddressIdx = profile.address.findIndex(
        (address) => address.isMain === true
      );
      setSelectedAddress(mainAddressIdx);
    };

    if (session) getProfile();
  }, [session]);

  const cart = profile?.cart || [];
  const address = profile?.address[selectedAddress];

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

  const handleCheckout = async () => {
    if (!profile) {
      showToaster("warning", "Please wait a minute");
      return;
    }
    const payload = {
      user: {
        fullname: profile.fullname,
        email: profile.email,
        address: profile.address[selectedAddress],
      },
      transaction: {
        items: profile.cart,
        total: subtotalPrice,
      },
    };

    const res = await transactionServices.generateTransaction(payload);
    window.snap.pay(res.data.data.token);
  };

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <div className="flex space-x-12 mx-auto max-w-3xl w-full">
        <section className="flex-2">
          <Title size="medium">Checkout</Title>
          <ChangeAddress
            address={address}
            setModalChangeAddress={setModalChangeAddress}
          />
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
          <Button className="w-full" variant="dark" onClick={handleCheckout}>
            Process Payment
          </Button>
        </section>
      </div>
      {modalChangeAddress && profile && (
        <ModalChangeAddress
          selectedAddress={selectedAddress}
          profile={profile}
          setProfile={setProfile}
          setSelectedAddress={setSelectedAddress}
          setModalChangeAddress={setModalChangeAddress}
        />
      )}
    </>
  );
}
