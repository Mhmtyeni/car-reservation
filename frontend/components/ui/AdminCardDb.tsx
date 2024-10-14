"use client";

import { HoverEffect } from "./AdminCard"; // Adjust the import as needed
import Link from "next/link";
import {
  useGetAvilableCarQuery,
  useGetUnavilableCarQuery,
} from "../../pages/slices/carsDetails";
import { useState } from "react";

export function AdminCardDb() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(99);

  const {
    data: havuzAvailableCar,
    isLoading,
    error,
  } = useGetAvilableCarQuery({
    page: 0,
    size: 99,
    carTypeId: "a980981a-0d18-4f06-93e8-08dcd30e6e05",
  });

  const { data: havuzUnavailableCar } = useGetUnavilableCarQuery({
    page: 0,
    size: 99,
    carTypeId: "a980981a-0d18-4f06-93e8-08dcd30e6e05",
  });

  const { data: vipAvailableCar } = useGetAvilableCarQuery({
    page: 0,
    size: 99,
    carTypeId: "a2727a23-b7d9-4720-93e9-08dcd30e6e05",
  });

  const { data: vipUnavailableCar } = useGetUnavilableCarQuery({
    page: 0,
    size: 99,
    carTypeId: "a2727a23-b7d9-4720-93e9-08dcd30e6e05",
  });

  if (isLoading) return <div className="container mx-auto my-40 loader"></div>;

  if (error) {
    const errorMessage =
      "status" in error
        ? `Error: ${error.status} - ${JSON.stringify(error.data)}`
        : error.message || "Bilinmeyen bir hata oluştu.";

    return (
      <div className="container mx-auto my-12 justify-center items-center flex flex-col sm:text-md text-xs font-titleTextType mb-44 -z-10">
        {errorMessage}
        <Link href="/" className="button underline absolute mt-[20%]">
          Anasayfa
        </Link>
      </div>
    );
  }

  // Group cars by their availability status
  const groupedCars = {
    " HAVUZ MÜSAİT ARAÇLAR": [...(havuzAvailableCar?.cars || [])],
    " VIP MÜSAİT ARAÇLAR": [...(vipAvailableCar?.cars || [])],
    " HAVUZ KULLANIMDA ARAÇLAR": [...(havuzUnavailableCar?.cars || [])],
    " VİP KULLANIMDA ARAÇLAR": [...(vipUnavailableCar?.cars || [])],
  };

  return (
    <div className="max-w-5xl mx-auto">
      <HoverEffect groupedCars={groupedCars} />
    </div>
  );
}
