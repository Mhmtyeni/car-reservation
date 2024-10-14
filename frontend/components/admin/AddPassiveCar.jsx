import React, { useState } from "react";
import { useGetPassiveCarQuery } from "../../pages/slices/carsDetails";
import Pagination from "../uicustom/Pagination";
import TextHeader from "../textcustom/TextHeader";
import Image from "next/image";

const AddPassiveCar = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const {
    data: passive,
    isLoading,
    error,
  } = useGetPassiveCarQuery({
    page,
    size,
    IsPassive: true,
  });
  const count = passive?.totalCarCount || 0;
  const totalPages = Math.ceil(count / size);
  const araba = passive?.cars || [];
  if (isLoading) return <div className=" container mx-auto my-40 loader"></div>;
  if (error) {
    const errorMessage =
      "status" in error
        ? `Error: ${error.status} - ${JSON.stringify(error.data)}`
        : error.message || "Bilinmeyen bir hata oluştu.";

    return (
      <div className="container mx-auto my-12 justify-center items-center flex flex-col sm:text-md text-xs font-titleTextType">
        {errorMessage}
        <Link href="/home" className="button underline absolute mt-[20%]">
          Anasayfa
        </Link>
      </div>
    );
  }
  return (
    <div className="h-full mt-5 w-auto min-w-full md:min-w-[200px] lg:min-w-[1024px]">
      <TextHeader addClass="md:text-sm text-[10px] font-bold">
        Pasif Araçlar
      </TextHeader>
      <div className="grid h-[40vh] overflow-y-auto scroll">
        <ul className="grid items-start min-[638px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-10 px-6 gap-y-32">
          {araba.map((car) => (
            <li
              className="justify-center relative items-center flex flex-col mt-5"
              key={car.id}
            >
              <TextHeader addClass="z-40 text-darkGrayColor ">
                {car.carLicensePlate}
              </TextHeader>
              <div className="flex gap-1 text-darkGrayColor">
                <TextHeader addClass="z-40   ">
                  {car.carBrandName} {car.carModelName}
                </TextHeader>
              </div>

              <span className="absolute h-44 w-[15em] ">
                <Image
                  src="/images/LicensePlate.png"
                  fill
                  alt=""
                  className="object-cover rounded-2xl "
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AddPassiveCar;
