"use client";
import Image from "next/image";
import { CarProps } from "../../types";
import BaseModal from "./BaseModal";
import { useEffect } from "react";

interface AdminCarDetails {
  isOpen: boolean;
  onClose: () => void;
  car: CarProps | null;
  onEdit: () => void;
  onDelete: () => void;
}

const ModalAdminCar = ({
  isOpen,
  onClose,
  car,
  onEdit,
  onDelete,
}: AdminCarDetails) => {
  if (!isOpen || !car) return null;

  useEffect(() => {
    if (car) {
      console.log("Modal'a gelen araba verisi:", car);
    }
  }, [car]);

  // Dinamik olarak CarProps alanlarını alıyoruz
  const carPropsKeys: (keyof CarProps)[] = [
    "carName",
    "carLicensePlate",
    "carBrandName",
    "carModelName",
    "carKM",
    "carFuelStatus",
    "carCapacity",
  ];
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={``}>
      <div className="flex-1 flex flex-col gap-3">
        <div className="relative w-full h-44 bg-pattern bg-cover bg-center rounded-lg">
          <Image
            src="/auto/detaycar.png"
            alt=" "
            priority
            fill
            fetchpriority="high"
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-semibold text-xl capitalize justify-center flex items-center">
          {car.carLicensePlate}
        </h3>
        <div className="mt-3 flex flex-wrap gap-4">
          {carPropsKeys.map((key) => (
            <div
              className="flex justify-between gap-5 w-full text-right"
              key={key}
            >
              <h4 className="text-darkColor/60 font-medium">
                {/* {key
                    .split(/(?=[A-Z])/)
                    .join(" ")
                    .toUpperCase()} */}
                {key.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()}
              </h4>
              <p className="text-darkGrayColor font-semibold">
                {car[key as keyof CarProps]
                  ? car[key as keyof CarProps].toString()
                  : ""}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-8">
          <button
            className="buttonEdit flex-1 static left-1/2 bottom-0 my-4 text-center"
            type="button"
            onClick={onEdit}
          >
            Araç Düzenle
          </button>
          <button
            className="buttonDelete flex-1 static left-1/2 bottom-0 my-4 text-center"
            type="button"
            onClick={onDelete}
          >
            Araç Sil
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalAdminCar;
