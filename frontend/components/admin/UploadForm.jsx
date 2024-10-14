import Link from "next/link";
import React from "react";
import { GrUpload } from "react-icons/gr";

const UploadForm = () => {
  return (
    <div className="sm:h-[100vh] h-[60vh] container mx-auto flex justify-center lg:p-8 lg:mt-0 mt-5">
      <div className="w-full h-40 bg-redColor"></div>
      <div className="absolute flex flex-col gap-5 items-center justify-center xl:w-[800px] xl:h-[500px] md:w-96 md:h-96 sm:w-80 sm:h-80 h-60 w-60 mt-16 bg-white border-grayColor border-2 border-dashed">
        <GrUpload className=" text-grayColor md:h-24 md:w-24 h-14 w-14 cursor-pointer hover:opacity-5 transition-all duration-700" />
        <p className="text-grayColor md:text-lg text-xs cursor-pointer hover:opacity-5 transition-all duration-700">
          Raporlara ulaşmak için tıklayınız.
        </p>
      </div>
      <Link
        href="/home"
        className="button underline absolute flex flex-col justify-center lg:mt-[40%] md:mt-[50%] sm:mt-[60%] mt-[80%]"
      >
        Anasayfa
      </Link>
    </div>
  );
};

export default UploadForm;
