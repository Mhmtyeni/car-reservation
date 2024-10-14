import React, { useState } from "react";

import TextHeader from "../../../components/textcustom/TextHeader";
import { MdEditNote, MdOutlineDeleteSweep, MdAdd } from "react-icons/md";
import { notify } from "../../../utils/notifications";

import {
  useDeleteReservationStatusMutation,
  useGetReservationStatusQuery,
  useGetReservationStatusesQuery,
} from "../../slices/reservationStatuses";
import EditRezStatusDB from "./editRezStatuses/[id]/EditRezStatusDB";
import AddRezStatusDB from "./addRezStatuses/AddRezStatusDB";

const ReservationStatusesList = () => {
  const [selectedRezStatus, setSelectedRezStatus] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(99);

  const {
    data: rezStatusesData,
    isLoading,
    error,
  } = useGetReservationStatusesQuery({ page, size });
  const [deleteRezStatus] = useDeleteReservationStatusMutation();

  // Seçilen markanın detaylarını getirmek için hook'u bileşen seviyesinde kullanıyoruz
  const { data: rezStatusdata, refetch } = useGetReservationStatusQuery(
    selectedRezStatus,
    {
      skip: !selectedRezStatus,
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading Rez Statuses: {error.message}</p>;

  const rezStatuses = rezStatusesData?.reservationStatues || [];

  const handleDelete = async (id) => {
    try {
      await deleteRezStatus(id).unwrap();
      notify.success();
    } catch (err) {
      console.error("Error deleting rezStatus", err);
    }
  };

  const handleViewCarClick = (id) => {
    setSelectedRezStatus(id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center rounded-md justify-between mt-10 bg-darkGrayColor/15 p-4 my-2 ">
        <TextHeader addClass={``}>Reservation Statuses listesi</TextHeader>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className=" text-white hover:text-greenColor flex items-center "
          title="add rezStatus"
        >
          Listeye ekle
          <MdAdd className="h-4 w-4" />
        </button>
      </div>
      <div className="h-44 overflow-y-auto scroll my-10 flex flex-col gap-4 ml-4 border-collapse border-t-4 pt-2 ">
        {rezStatusesData?.totalReservationStatusCount >= 1 &&
          rezStatuses.map((rezStatus) => (
            <div key={rezStatus.id} className="flex justify-between">
              <TextHeader>{rezStatus.statusName}</TextHeader>
              <div className="flex gap-4 mr-4">
                <button
                  onClick={() => handleViewCarClick(rezStatus.id)}
                  className="text-greenColor hover:text-darkGrayColor transition-all transform duration-500 text-2xl"
                  title="edit"
                >
                  <MdEditNote />
                </button>
                <button
                  className="text-redColor text-2xl hover:text-darkGrayColor transition-all transform duration-500"
                  title="delete"
                  onClick={() => handleDelete(rezStatus.id)}
                >
                  <MdOutlineDeleteSweep />
                </button>
              </div>
            </div>
          ))}
      </div>

      {isAddModalOpen && (
        <div className="modal-background">
          <div className="modal-content">
            <AddRezStatusDB closeModal={closeAddModal} />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal-background">
          <div className="modal-content">
            <EditRezStatusDB
              id={selectedRezStatus}
              closeModal={closeEditModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationStatusesList;
