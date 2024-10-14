import React, { useState } from "react";
import TextHeader from "../textcustom/TextHeader";

import { useGetUserReservationApprovalsQuery } from "../../pages/slices/carReservationApprovals";
import CarAdminTableRow from "../ui/CarAdminTableRow";
import SignalRComponent from "../signalR/SignalRComponent";
import Pagination from "../uicustom/Pagination";
import Cookies from "js-cookie";
const UserReservation = () => {
  const id = Cookies.get("userId");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const {
    data: carsData,
    error,
    isLoading,
    refetch,
  } = useGetUserReservationApprovalsQuery({
    page,
    size,
    appUserId: id,
    reservationStatusId: "17366796-f715-4557-8869-08dcce32f7dd",
  });
  const carDate = carsData?.carReservationApprovals || [];
  const count = carsData?.totalCarReservationApprovalCount || 0;
  const totalPages = Math.ceil(count / size);
  const [message, setMessage] = useState("");

  const handleNewMessage = (newMessage) => {
    setMessage(newMessage);
    refetch();
  };
  return (
    <div className="h-full mt-5 w-auto min-w-full md:min-w-[200px] lg:min-w-[1024px]">
      <TextHeader addClass="md:text-sm text-[10px] font-bold">
        Bekleyen Randevular
      </TextHeader>

      <div className="w-full mt-5">
        <table className="w-full md:text-sm text-[8px] text-center text-white min-w-[80px] capitalize">
          <thead className="text-white uppercase bg-darkGrayColor">
            <tr>
              <th scope="col" className="md:py-3 md:px-6 py-1 px-1">
                Oluşturma Tarihi
              </th>
              <th scope="col" className="md:py-3 md:px-6 py-1 px-1">
                Alış Tarihi
              </th>
              <th scope="col" className="md:py-3 md:px-6 py-1 px-1">
                Bırakış Tarihi
              </th>
              <th scope="col" className="md:py-3 md:px-6 py-1 px-1">
                Adres
              </th>
              <th scope="col" className="md:py-3 md:px-6 py-1 px-1">
                Plaka
              </th>
              <th scope="col" className="md:py-3 md:px-6 py-1 px-1">
                Onay Durumu
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {carDate.map((car) => (
              <CarAdminTableRow key={car.id} car={car} />
            ))}
          </tbody>
        </table>
        <SignalRComponent onMessage={handleNewMessage} />
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default UserReservation;
