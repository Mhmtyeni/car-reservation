import React, { useState } from "react";
import {
  GrClose,
  GrStatusGood,
  GrStatusWarning,
  GrStatusCritical,
  GrStatusUnknown,
  GrStatusDisabled,
} from "react-icons/gr";
import { useGetCarQuery } from "../../pages/slices/carsDetails";
import { useGetReservationStatusesQuery } from "../../pages/slices/reservationStatuses";
import { useUpdateCarReservationApprovalsMutation } from "../../pages/slices/carReservationApprovals";
import BaseModal from "./BaseModal";
import TextHeader from "../textcustom/TextHeader";
import { notify } from "../../utils/notifications";
import RezCarDetay from "../uicustom/RezCarDetay";
import { useGetUserQuery } from "../../pages/slices/userApi";
import RezUserDetay from "../uicustom/RezUserDetay";

const tabs = [
  { label: "User Details", component: RezUserDetay },
  { label: "Car Details", component: RezCarDetay },
];

const CarAdminTableRowModal = ({ carRez, carDetails, onClose }) => {
  const { data: status, isFetching: isFetchingStatus } =
    useGetReservationStatusesQuery({ page: 0, size: 5 });
  const { data: car, isFetching: isFetchingCar } = useGetCarQuery(carDetails);
  const { data: user } = useGetUserQuery(carRez.appUserId);
  const [updateRez] = useUpdateCarReservationApprovalsMutation();

  const [isOpen, setIsOpen] = useState(true);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleStatusChange = async (statusId) => {
    try {
      await updateRez({
        carReservationApprovalId: carRez.id,
        reservationStatusId: statusId,
      });
      notify.success();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const handleClose = () => {
    onClose();
    setIsOpen(false);
  };

  const getStatusIcon = (statusName) => {
    switch (statusName) {
      case "Bekleniyor":
        return <GrStatusWarning className="text-yellow-300" size={24} />;
      case "Onaylandı":
        return <GrStatusGood className="text-green-300" size={24} />;
      case "Reddedildi":
        return <GrStatusCritical className="text-red-300" size={24} />;
      case "Tamamlandı":
        return <GrStatusUnknown className="text-blue-300" size={24} />;
      case "İptal Edildi":
        return <GrStatusDisabled className="text-gray-300" size={24} />;
      default:
        return <GrClose className="text-black-300" size={24} />;
    }
  };

  if (isFetchingStatus || isFetchingCar) return <p>Loading...</p>;

  const CurrentComponent = tabs[currentTabIndex].component;

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} title="">
      <TextHeader addClass="border-collapse px-8 border-b-2 border-darkGrayColor text-darkGrayColor mb-4">
        Rezervasyon Detayları
      </TextHeader>
      <div className="flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setCurrentTabIndex(index)}
              className={`p-2 ${
                currentTabIndex === index
                  ? "font-bold border-b-2 border-darkGrayColor"
                  : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="w-full h-[60vh] overflow-y-auto">
          <CurrentComponent car={car} user={user} />
        </div>
        <div className="mt-4">
          {status?.reservationStatues?.map((statusItem) => (
            <button
              key={statusItem.id}
              onClick={() => handleStatusChange(statusItem.id)}
              className={`p-2 rounded text-white ${getStatusIcon(
                statusItem.statusName
              )}`}
              title={statusItem.statusName}
            >
              {getStatusIcon(statusItem.statusName)}
            </button>
          ))}
        </div>
        <TextHeader addClass="border-collapse border-dashed border-t-2 border-darkGrayColor/50 w-full items-center flex justify-center mt-4 py-4 ">
          {carRez.statusName}
        </TextHeader>
      </div>
    </BaseModal>
  );
};

export default CarAdminTableRowModal;
