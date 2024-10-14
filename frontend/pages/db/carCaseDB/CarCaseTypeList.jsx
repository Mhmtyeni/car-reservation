import React, { useState } from "react";
import {
  useDeleteCarCaseTypeMutation,
  useGetCarCaseTypeQuery,
  useGetCarCaseTypesQuery,
} from "../../slices/carCaseType";
import TextHeader from "../../../components/textcustom/TextHeader";
import { MdAdd, MdEditNote, MdOutlineDeleteSweep } from "react-icons/md";
import { notify } from "../../../utils/notifications";
import EditCarCaseDB from "./editCarCase/[id]/EditCarCaseDB";
import AddCarCaseDB from "./addCarCase/AddCarCaseDB";

const CarCaseTypeList = () => {
  const [selectedCarCase, setSelectedCarCase] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: carCaseTypeData } = useGetCarCaseTypesQuery(0, 10);
  const [deleteCarCase] = useDeleteCarCaseTypeMutation();

  const { refetch } = useGetCarCaseTypeQuery(selectedCarCase, {
    skip: !selectedCarCase,
  });
  const carCaseType = carCaseTypeData?.carCaseTypes || [];

  const handleDelete = async (id) => {
    try {
      await deleteCarCase(id).unwrap();
      notify.success();
    } catch (err) {
      console.error("Error deleting car case", err);
    }
  };

  const handleViewCarClick = (id) => {
    setSelectedCarCase(id);
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
        <TextHeader>Araba Kasa tipi listesi</TextHeader>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className=" text-white hover:text-greenColor flex items-center "
          title="add car case"
        >
          Listeye ekle
          <MdAdd className="h-4 w-4" />
        </button>
      </div>
      <div className="h-44 overflow-y-auto scroll my-10 flex flex-col gap-4 ml-4 border-collapse border-t-4 pt-2 ">
        {carCaseTypeData?.totalCarCaseTypeCount >= 1 &&
          carCaseType.map((carcase) => (
            <div key={carcase.id} className="flex justify-between">
              <TextHeader>{carcase.carCaseTypeName}</TextHeader>
              <div className="flex gap-4 mr-4">
                <button
                  onClick={() => handleViewCarClick(carcase.id)}
                  className="text-greenColor hover:text-darkGrayColor transition-all transform duration-500 text-2xl"
                  title="edit"
                >
                  <MdEditNote />
                </button>
                <button
                  className="text-redColor text-2xl hover:text-darkGrayColor transition-all transform duration-500"
                  title="delete"
                  onClick={() => handleDelete(carcase.id)}
                >
                  <MdOutlineDeleteSweep />
                </button>
              </div>
            </div>
          ))}
      </div>
      {isAddModalOpen && <AddCarCaseDB closeModal={closeAddModal} />}

      {isEditModalOpen && (
        <EditCarCaseDB id={selectedCarCase} closeModal={closeEditModal} />
      )}
    </div>
  );
};

export default CarCaseTypeList;
