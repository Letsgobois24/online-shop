"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "@/components/Elements/Button";
import Link from "next/link";

export default function HomeView() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {[1, 2, 3].map((num) => (
        <SwiperSlide key={num}>
          <div
            className="h-main w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(/image/jumbotron/${num}.jpg)`,
            }}
          >
            <div className="bg-black/50 w-full h-full"></div>
          </div>
        </SwiperSlide>
      ))}
      {/* Custom navigation buttons */}
      <div className="custom-prev right-18">❮</div>
      <div className="custom-next right-4">❯</div>
      {/* Kalimat pada jumbotron */}
      <div className="flex flex-col justify-center items-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-1">
        <h1 className="text-7xl font-extrabold text-white tracking-wider font-lato mb-5">
          Letsgobois Shop
        </h1>
        <p className="text-2xl tracking-wide text-slate-200 mb-4 font-lato">
          Simpel. Stylish. Berkelas
        </p>
        <Button padding="medium" variant="white" className="font-semibold">
          <Link href="/products">Show Products</Link>
        </Button>
      </div>
    </Swiper>
  );
}
