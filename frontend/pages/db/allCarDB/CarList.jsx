import React, { useState } from "react";
import {
  useDeleteCarMutation,
  useGetPassiveCarQuery,
} from "../../slices/carsDetails";
import { useRouter } from "next/navigation";
import ModalAdminCar from "../../../components/ui/ModalAdminCar";
import Image from "next/image";
import Link from "next/link";
import { CarProps } from "../../../types";
import Pagination from "../../../components/uicustom/Pagination";
import TextHeader from "../../../components/textcustom/TextHeader";
import Cookies from "js-cookie";

const CarList = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);

  const {
    data: carsss,
    error,
    isLoading,
    refetch,
  } = useGetPassiveCarQuery({ page, size, IsPassive: false });
  const [deleteCar] = useDeleteCarMutation();

  const araba = carsss?.cars || [];
  const count = carsss?.totalCarCount || 0;
  const totalPages = Math.ceil(count / size);

  const handleViewCarClick = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  const handleEditCar = () => {
    if (selectedCar) {
      router.push(`/db/allCarDB/editCar/${selectedCar.id}/EditCarDB`);
    }
  };

  const handleDeleteCar = async () => {
    if (selectedCar) {
      try {
        await deleteCar(selectedCar.id).unwrap();
        handleCloseModal();
        refetch();
      } catch (error) {
        console.error("Araba pasife alınırken bir hata oluştu", error);
      }
    }
  };

  if (isLoading) return <div className=" container mx-auto my-40 loader"></div>;
  if (error) {
    const errorMessage =
      "status" in error
        ? `Error: ${error.status} - ${JSON.stringify(error.data)}`
        : error.message || "Bilinmeyen bir hata oluştu.";

    return (
      <div className="container mx-auto my-12 justify-center items-center flex flex-col sm:text-md text-xs font-titleTextType">
        {errorMessage}
        <Link href="/" className="button underline absolute mt-[20%]">
          Anasayfa
        </Link>
      </div>
    );
  }
  return (
    <div className="grid">
      <Link
        className="button items-center justify-center mb-7 text-center mx-24 "
        href="/db/allCarDB/addCar/AddCarDB/"
      >
        Yeni Araba Ekle
      </Link>
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
        {selectedCar && (
          <ModalAdminCar
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            car={selectedCar}
            onEdit={handleEditCar}
            onDelete={handleDeleteCar}
          />
        )}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default CarList;
