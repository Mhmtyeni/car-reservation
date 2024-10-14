import React, { useState } from "react";
import { useGetCarQuery } from "../../pages/slices/carsDetails";
import { useGetReservationStatusesQuery } from "../../pages/slices/reservationStatuses";
import { GrCheckmark, GrClose, GrHelp } from "react-icons/gr";
import CarAdminTableRowModal from "./CarAdminTableRowModal";

// getStatusDetails fonksiyonu tanımı
const getStatusDetails = (statusName) => {
  switch (statusName) {
    case "Onaylandı":
      return {
        text: "Onaylandı",
        icon: <GrCheckmark />,
        color: "hover:bg-greenColor",
      };
    case "Bekleniyor":
      return {
        text: "Bekleniyor",
        icon: <GrHelp />,
        color: "hover:bg-yellowColor",
      };
    default:
      return { text: "Bilinmiyor", icon: null, color: "" };
  }
};

const filterByStatus = (statusName) => {
  const allowedStatuses = ["Onaylandı", "Bekleniyor"];
  return allowedStatuses.includes(statusName);
};
const CarAdminTableRow = ({ car }) => {
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
          {new Date(car.createdDate).toLocaleDateString()}
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

        <td>{statusDetail.icon}</td>
      </tr>
      {isModalOpen && (
        <CarAdminTableRowModal
          carDetails={carKimlik}
          onClose={handleCloseModal}
          carRez={car}
        />
      )}
    </>
  );
};

export default CarAdminTableRow;
