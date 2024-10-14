import React, { useState } from "react";

import TextHeader from "../../../components/textcustom/TextHeader";
import { MdAdd, MdEditNote, MdOutlineDeleteSweep } from "react-icons/md";
import {
  useDeleteCarTypeMutation,
  useGetCarTypeQuery,
  useGetCarTypesQuery,
} from "../../slices/carType";
import AddCarTypeDB from "./addCarType/AddCarTypeDB";
import EditCarType from "./editCarType/[id]/EditCarType";

const CarTypesList = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(99);

  const {
    data: typeData,
    isLoading,
    error,
  } = useGetCarTypesQuery({ page, size });

  const [deleteCarType] = useDeleteCarTypeMutation();

  const { data, refetch } = useGetCarTypeQuery(selectedType, {
    skip: !selectedType,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading carTypes: {error.message}</p>;

  const carTypes = typeData?.carTypes || [];

  const handleDelete = async (id) => {
    try {
      await deleteCarType(id).unwrap();
      notify.success();
    } catch (err) {
      console.error("Error deleting brand", err);
    }
  };

  const handleViewCarClick = (id) => {
    setSelectedType(id);
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
      <div>
        <div className="flex items-center rounded-md justify-between mt-10 bg-darkGrayColor/15 p-4 my-2 ">
          <TextHeader>Araba Type listesi</TextHeader>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className=" text-white hover:text-greenColor flex items-center "
            title="Add Engine Type"
          >
            Listeye ekle
            <MdAdd className="h-4 w-4" />
          </button>
        </div>
        <div className="h-44 overflow-y-auto scroll my-10 flex flex-col gap-4 ml-4 border-collapse border-t-4 pt-2 ">
          {typeData?.totalCarTypeCount >= 1 &&
            carTypes.map((carType) => (
              <div key={carType.id} className="flex justify-between">
                <TextHeader>{carType.carTypeName}</TextHeader>
                <div className="flex gap-4 mr-4">
                  <button
                    onClick={() => handleViewCarClick(carType.id)}
                    className="text-greenColor hover:text-darkGrayColor transition-all transform duration-500 text-2xl"
                    title="edit"
                  >
                    <MdEditNote />
                  </button>
                  <button
                    className="text-redColor text-2xl hover:text-darkGrayColor transition-all transform duration-500"
                    title="delete"
                    onClick={() => handleDelete(carType.id)}
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
              <AddCarTypeDB closeModal={closeAddModal} />
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div className="modal-background">
            <div className="modal-content">
              <EditCarType id={selectedType} closeModal={closeEditModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarTypesList;
