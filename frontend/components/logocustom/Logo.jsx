//Navbar içinde bulunan Ana Logo.
"use client";
import Image from "next/image";
import { useRouter } from "next/router";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      as="image"
      onClick={() => router.push("/home")}
      className=" relative container mx-auto lg:w-[1577px] md:w-[600px] sm:w-[560px] w-[460px] md:h-18 sm:h-16 h-12 opacity-70 cursor-pointer"
    >
      <Image
        src="/images/baslikNewGray.png"
        alt=""
        fetchPriority="high"
        priority
        fill
        sizes="(max-width: 768px) 100vw, 700px"
      />
    </div>
  );
};

export default Logo;
