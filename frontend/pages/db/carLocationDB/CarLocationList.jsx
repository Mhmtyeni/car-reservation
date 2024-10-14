import React, { useState } from "react";

import TextHeader from "../../../components/textcustom/TextHeader";
import { MdEditNote, MdOutlineDeleteSweep, MdAdd } from "react-icons/md";
import { notify } from "../../../utils/notifications";
import {
  useDeleteLocationMutation,
  useGetLocationQuery,
  useGetLocationsQuery,
} from "../../slices/carLocations";
import EditCarLocationDB from "./editCarLocation/[id]/EditCarLocationDB";
import AddCarLocationDB from "./addCarLocation/AddCarLocationDB";

const CarLocationList = () => {
  const [selectedCarLocation, setSelectedCarLocation] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add modal state'i

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(99);

  // Tüm markaları getiriyoruz
  const {
    data: carLocationDatas,
    isLoading,
    error,
  } = useGetLocationsQuery({ page, size });
  const [deleteCarLocation] = useDeleteLocationMutation();

  const {
    data: branData,
    error: brandError,
    refetch,
  } = useGetLocationQuery(selectedCarLocation, {
    skip: !selectedCarLocation,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading carlocations: {error.message}</p>;

  const carLocations = carLocationDatas?.locations || [];

  const handleDelete = async (id) => {
    try {
      await deleteCarLocation(id).unwrap();
      notify.success();
    } catch (err) {
      console.error("Error deleting brand", err);
    }
  };
  const handleViewCarClick = (id) => {
    setSelectedCarLocation(id);
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
        <TextHeader addClass={``}>Araba Lokasyon listesi</TextHeader>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className=" text-white hover:text-greenColor flex items-center "
          title="add brand"
        >
          Listeye ekle
          <MdAdd className="h-4 w-4" />
        </button>
      </div>
      <div className="h-44 overflow-y-auto scroll my-10 flex flex-col gap-4 ml-4 border-collapse border-t-4 pt-2 ">
        {carLocationDatas?.totalLocationCount >= 1 &&
          carLocations.map((carLocation) => (
            <div key={carLocation.id} className="flex justify-between">
              <TextHeader>{carLocation.locationName}</TextHeader>
              <div className="flex gap-4 mr-4">
                <button
                  onClick={() => handleViewCarClick(carLocation.id)}
                  className="text-greenColor hover:text-darkGrayColor transition-all transform duration-500 text-2xl"
                  title="edit"
                >
                  <MdEditNote />
                </button>
                <button
                  className="text-redColor text-2xl hover:text-darkGrayColor transition-all transform duration-500"
                  title="delete"
                  onClick={() => handleDelete(carLocation.id)}
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
            <AddCarLocationDB closeModal={closeAddModal} />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal-background">
          <div className="modal-content">
            <EditCarLocationDB
              id={selectedCarLocation}
              closeModal={closeEditModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarLocationList;
