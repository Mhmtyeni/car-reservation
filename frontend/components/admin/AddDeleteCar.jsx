import React, { useState } from "react";
import { useGetCarsQuery } from "../../pages/slices/carsDetails";
import TextHeader from "../textcustom/TextHeader";
import Pagination from "../uicustom/Pagination";
import Image from "next/image";

const AddDeleteCar = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);

  const { data: deleteCars } = useGetCarsQuery({ page, size });
  const count = deleteCars?.totalCarCount || 0;
  const totalPages = Math.ceil(count / size);

  const araba = deleteCars?.cars || [];
  return (
    <div className="h-full mt-5 w-auto min-w-full md:min-w-[200px] lg:min-w-[1024px]">
      <TextHeader addClass="md:text-sm text-[10px] font-bold">
        Silinmiş Araçlar
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

export default AddDeleteCar;
