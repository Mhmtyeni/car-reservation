"use client";

import React from "react";

import dynamic from "next/dynamic";
import {
  GrAnnounce,
  GrHomeRounded,
  GrUser,
  GrServices,
  GrPowerShutdown,
} from "react-icons/gr";
import Link from "next/link";

const Logo = dynamic(() => import("../logocustom/Logo"), { ssr: false });
const Title = dynamic(() => import("../textcustom/Title"), { ssr: false });

const Navbar = () => {
  return (
    <div className="flex flex-col justify-between items-center z-50">
      <div className="relative z-40 my-8 bg-transparent">
        <Logo />
        <Title addClass="absolute">idari isler portalı</Title>
      </div>
      <div className="bg-white container mx-auto relative m-4 z-40 text-darkGrayColor/80 shadow-xl lg:text-2xl sm:text-xl text-base lg:w-[960px] md:w-[760px] sm:w-[660px] w-[360px] lg:h-20 sm:h-16 h-12 rounded-[60px] flex justify-center items-center lg:gap-x-40 md:gap-x-32 sm:gap-x-24 gap-x-14 -mt-4 mb-8">
        <Link href="/home">
          <GrHomeRounded className="ico-navbar" />
        </Link>
        <Link href="/user">
          <GrUser className="ico-navbar" />
        </Link>
        <Link href="/adminplus">
          <GrAnnounce className="ico-navbar" />
        </Link>
        <Link href="/admin">
          <GrServices className="ico-navbar" />
        </Link>
        <Link href="/login">
          <GrPowerShutdown className="ico-navbar" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
