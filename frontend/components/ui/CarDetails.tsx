import translations from "../uicustom/translations.json";
import BaseModal from "./BaseModal";

import Link from "next/link";
import { Car } from "../../types";
import Image from "next/image";

interface CarDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car;
  startDate: string;
  endDate: string;
  startLocationId: string;
}

const CarDetails = ({
  isOpen,
  onClose,
  car,
  startDate,
  endDate,
  startLocationId,
}: CarDetailsProps) => {
  const handleContinueClick = () => {};

  // Sadece Car arayüzünde tanımlı olan alanları filtreleyin
  const carPropsKeys: (keyof Car)[] = [
    "carBrandName",
    "carModelName",
    "carKM",
    "carFuelStatus",
    "carCapacity",
    "locationName",
    "companyName",
    "carTypeName",
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
                  {translations[key] || key}{" "}
                </h4>
                <p className="text-darkGrayColor font-semibold">
                  {car[key]?.toString() || ""}
                </p>
              </div>
            ))}
          </div>
          <Link
            href={{
              pathname: "/reservationuser",
              query: {
                startDate,
                endDate,
                carId: car.id,
              },
            }}
            className="button static left-1/2 bottom-0 my-4 text-center"
            type="submit"
            onClick={handleContinueClick}
          >
            Bu araçla devam etmek istiyorum!
          </Link>
        </div>
      </div>
    </BaseModal>
  );
};

export default CarDetails;
