import React, { useState } from "react";
import { useGetCarQuery } from "../../pages/slices/carsDetails";
import { useGetReservationStatusesQuery } from "../../pages/slices/reservationStatuses";
import { GrCheckmark, GrClear, GrClose } from "react-icons/gr";
import CarAdminPastTableRowModal from "./CarAdminPastTableRowModal";

// getStatusDetails fonksiyonu tanımı
const getStatusDetails = (statusName) => {
  switch (statusName) {
    case "Tamamlandı":
      return {
        text: "Tamamlandı",
        icon: <GrCheckmark />,
        color: "hover:bg-darkGrayColor/10",
      };
    case "Reddedildi":
      return {
        text: "Reddedildi",
        icon: <GrClose />,
        color: "hover:bg-darkGrayColor/80",
      };
    case "İptal Edildi":
      return {
        text: "İptal Edildi",
        icon: <GrClear />,
        color: "hover:bg-darkGrayColor/50",
      };
    default:
      return { text: "Bilinmiyor", icon: null, color: "" };
  }
};
const filterByStatus = (statusName) => {
  const allowedStatuses = ["Tamamlandı", "Reddedildi", "İptal Edildi"];
  return allowedStatuses.includes(statusName);
};
const CarAdminPastTableRow = ({ car }) => {
  const { data: carDetails, isFetching } = useGetCarQuery(car.carId);
  const { data: status } = useGetReservationStatusesQuery({ page: 0, size: 5 });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusDetail = getStatusDetails(car.statusName);
  const carKimlik = car.carId;

  const handleRowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  if (!filterByStatus(car.statusName)) {
    return null;
  }
  return (
    <>
      <tr
        key={car.id}
        className={`transition-all cursor-pointer text-black ${statusDetail.color}`}
        onClick={handleRowClick}
      >
        <td className="md:py-4 md:px-6 py-1 px-1 font-medium whitespace-nowrap">
          {new Date(car.modifiedDate).toLocaleDateString()}
        </td>
        <td className="md:py-4 md:px-6 py-1 px-1 font-medium whitespace-nowrap">
          {new Date(car.startDateTime).toLocaleDateString()}
        </td>
        <td className="md:py-4 md:px-6 py-1 px-1 font-medium whitespace-nowrap">
          {new Date(car.endDateTime).toLocaleDateString()}
        </td>
        <td className="md:py-4 md:px-6 py-1 px-1 font-medium whitespace-nowrap">
          {carDetails ? carDetails.locationName : "Bilgi Bulunamadı"}
        </td>
        <td className="md:py-4 md:px-6 py-1 px-1 font-medium whitespace-nowrap">
          {carDetails ? carDetails.carLicensePlate : "Bilgi Bulunamadı"}
        </td>
        <td className="md:py-4 md:px-6 py-1 px-1 font-medium whitespace-nowrap">
          {statusDetail.text}
        </td>

        <td className="h-4 w-4">{statusDetail.icon}</td>
      </tr>

      {isModalOpen && (
        <CarAdminPastTableRowModal
          carDetails={carKimlik}
          onClose={handleCloseModal}
          carRez={car}
        />
      )}
    </>
  );
};

export default CarAdminPastTableRow;
