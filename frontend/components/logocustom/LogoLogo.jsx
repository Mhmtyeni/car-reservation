//Vestel' in logosu.
import Image from "next/image";
import React from "react";

const LogoLogo = () => {
  return (
    <div className=" relative sm:w-[120px] w-[80px] sm:h-7 h-4 cursor-pointer">
      <Image
        src="/images/baslikNewGray.png"
        alt="Logo"
        fill
        fetchpriority="high"
        sizes="(max-width: 120px) 100vw, 120px"
        blurDataURL
      />
    </div>
  );
};

export default LogoLogo;
