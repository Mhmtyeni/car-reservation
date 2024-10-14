import React, { useState } from "react";

import { useGetCarQuery } from "../../pages/slices/carsDetails";
import { useGetReservationStatusesQuery } from "../../pages/slices/reservationStatuses";
import { useUpdateCarReservationApprovalsMutation } from "../../pages/slices/carReservationApprovals";
import BaseModal from "./BaseModal";
import translations from "../uicustom/translations.json";
import TextHeader from "../textcustom/TextHeader";

const CarAdminPastTableRowModal = ({ carRez, carDetails, onClose }) => {
  const { data: status, isFetching: isFetchingStatus } =
    useGetReservationStatusesQuery({ page: 0, size: 5 });
  const {
    data: car,
    isFetching: isFetchingCar,
    refetch,
  } = useGetCarQuery(carDetails);
  const [updateRez] = useUpdateCarReservationApprovalsMutation();
  const [isOpen, setIsOpen] = useState(true);

  const handleStatusChange = async (statusId) => {
    try {
      await updateRez({
        carReservationApprovalId: carRez.id,
        reservationStatusId: statusId,
      });
      notify.success("Durum başarıyla güncellendi");

      refetch();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const handleClose = () => {
    onClose();
    setIsOpen(false);
  };

  if (isFetchingStatus || isFetchingCar) return <p>Loading...</p>;

  const carPropsKeys = [
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
    <BaseModal isOpen={isOpen} onClose={handleClose} title="">
      <TextHeader addClass="border-collapse px-8 border-b-2 border-darkGrayColor text-darkGrayColor mb-4">
        Rezervasyon Detayları
      </TextHeader>
      <div className="flex flex-col w-full">
        {carPropsKeys.map((key) => (
          <div
            key={key}
            className="flex justify-between items-start mb-5 px-8  border-collapse border-b-2 border-darkGrayColor/50"
          >
            <h2>{translations[key] || key}:</h2>
            <h2 className="font-textTextType font-bold text-darkColor">
              {car[key].toString() || ""}
            </h2>
          </div>
        ))}
        <div className="mt-4 flex flex-col gap-2 justify-center items-center w-full ">
          <TextHeader addClass="border-collapse border-dashed border-t-2 border-darkGrayColor/50 w-full items-center flex justify-center mt-4 py-4 ">
            {carRez.statusName}
          </TextHeader>
        </div>
      </div>
    </BaseModal>
  );
};

export default CarAdminPastTableRowModal;
