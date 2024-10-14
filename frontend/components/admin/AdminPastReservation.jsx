import React, { useState } from "react";
import TextHeader from "../textcustom/TextHeader";
import { useGetCarReservationApprovalsQuery } from "../../pages/slices/carReservationApprovals";
import CarAdminPastTableRow from "../ui/CarAdminPastTableRow";
import Pagination from "../uicustom/Pagination";

const AdminPastReservation = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const {
    data: carsData,
    error,
    isLoading,
  } = useGetCarReservationApprovalsQuery({ page, size });

  const carDate = carsData?.carReservationApprovals || [];
  const count = carsData?.totalCarReservationApprovalCount || 0;
  const totalPages = Math.ceil(count / size);

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>Veri yüklenirken bir hata oluştu</p>;

  return (
    <div className="h-full mt-5 w-auto min-w-full md:min-w-[200px] lg:min-w-[1024px]">
      <TextHeader addClass="md:text-sm text-[10px] font-bold">
        Geçmiş işlemler
      </TextHeader>
      <div className="w-full mt-5">
        <table className="w-full md:text-sm text-[8px] text-center text-white min-w-[80px] capitalize">
          <thead className="text-white uppercase bg-darkGrayColor">
            <tr>
              <th scope="col" className="md:py-3 md:px-6 py-1 px-1">
                teslim Tarihi
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
              <CarAdminPastTableRow key={car.id} car={car} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AdminPastReservation;
