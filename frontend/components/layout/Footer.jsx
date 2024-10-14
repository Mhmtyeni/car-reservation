import React from "react";
import LogoLogo from "../logocustom/LogoLogo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" relative w-full flex flex-col text-darkColor mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-center sm:px-16 px-6 py-2">
        <div className="flex flex-col justify-center items-center gap-6">
          <LogoLogo />
          <p className=" md:text-sm text-xs text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            condimentum semper sapien, nec placerat nisi bibendum ac. Donec
            ullamcorper est eget lacinia mattis.
            <br />
          </p>
        </div>
      </div>

      <div
        className=" flex items-center justify-between md:text-xs text-[6px] mt-10 border-t border-gray-400
      sm:px-16 px-6 py-10"
      >
        <p>@2024 Lorem ipsum. All Rights Reserved</p>
        <div className=" flex gap-10">
          <Link href="/" className="text-gray-500">
            Privacy Policy
          </Link>
          <Link href="/" className="text-gray-500">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
