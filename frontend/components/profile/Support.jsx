import React from "react";
import Link from "next/link";
import Image from "next/image";
const Support = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center relative md:pr-8 lg:mt-0 mt-5 w-full ">
      <div className="w-full h-40 bg-grayColor/80 relative"></div>
      <div className="relative m-4 z-40 lg:flex md:flex-wrap flex justify-center items-center sm:gap-x-14 -mt-24 -mb-24 ">
        <div className=" relative xl:w-[400px] xl:h-[500px] md:w-[22rem] md:h-[22rem] sm:w-80 sm:h-80 h-60 w-60">
          <Image src="element/support.svg" alt="" fill />
        </div>
        <div className=" relative xl:w-[400px] xl:h-[500px] md:w-[22rem] md:h-[22rem] sm:w-80 sm:h-80 h-60 w-60 ">
          <Image src="element/supportfeed.svg" alt="" fill />
        </div>
      </div>
      <div className="w-full h-40 bg-grayColor/80"></div>
      <Link href="/home" className="button underline absolute top-[95%] ">
        Anasayfa
      </Link>
    </div>
  );
};

export default Support;
